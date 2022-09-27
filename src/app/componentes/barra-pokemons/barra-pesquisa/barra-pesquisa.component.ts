import { PokemonsService } from './../../pokemons.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  switchMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { outputAst } from '@angular/compiler';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.scss'],
})
export class BarraPesquisaComponent implements OnInit {
  optionsTipos = [{ name: 'todos' }];
  optionsRegioes = [{ name: 'todos' }];
  searchControl = new FormControl();
  // digitacao$ = this.pokemonsService
  //   .buscarPokemon()
  //   .pipe(debounceTime(ESPERA_DIGITACAO));
  filtroPokemon$ = this.searchControl.valueChanges.pipe(
    filter((valorDigitado) => {
      console.log(valorDigitado.length >= 1 || !valorDigitado);
      return valorDigitado.length >= 1 || !valorDigitado;
    }),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.pokemonsService.buscarPokemon(valorDigitado)
    )
  );
  // configuracaoDoFiltro$ = merge(this.digitacao$, this.filtroPokemon$);
  @Output() pokemonsPesquisados = new EventEmitter<any>();

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.listarTipos().subscribe((res: any) => {
      this.optionsTipos = this.optionsTipos.concat(res.results);
    });

    this.pokemonsService.listarRegioes().subscribe((res: any) => {
      this.optionsRegioes = this.optionsRegioes.concat(res.results);
    });

    this.inscreverValueChanges();
  }

  inscreverValueChanges() {
    this.searchControl.valueChanges
      .pipe(
        filter((valorDigitado) => {
          console.log(valorDigitado.length >= 1 || !valorDigitado);
          return valorDigitado.length >= 1 || !valorDigitado;
        }),
        distinctUntilChanged(),
        switchMap((valorDigitado) =>
          this.pokemonsService.buscarPokemon(valorDigitado)
        )
      )
      .subscribe((res: any) => {
        this.pokemonsPesquisados.emit(res);
      });
  }
}
