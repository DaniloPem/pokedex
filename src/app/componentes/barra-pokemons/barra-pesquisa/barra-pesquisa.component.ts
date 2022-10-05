import { PokemonsService } from './../../pokemons.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.scss'],
})
export class BarraPesquisaComponent implements OnInit {
  optionsTipos = [{ name: 'todos' }];
  optionsRegioes = [{ name: 'todos' }];
  searchControl = new FormControl();
  filtroPokemon$ = this.searchControl.valueChanges.pipe(
    filter((valorDigitado) => {
      return valorDigitado.length >= 1 || !valorDigitado;
    }),
    switchMap((valorDigitado) =>
      this.pokemonsService.buscarPokemon(valorDigitado)
    )
  );
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
    this.filtroPokemon$.subscribe((res: any) => {
      this.pokemonsPesquisados.emit(res);
    });
  }
}
