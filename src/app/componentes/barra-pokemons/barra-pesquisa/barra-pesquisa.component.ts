import { PokemonsService } from './../../pokemons.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.scss'],
})
export class BarraPesquisaComponent implements OnInit {
  optionsTipos = [{ name: 'todos' }];
  optionsRegioes = [{ name: 'todos' }];
  @Input() filtroInicial!: string;
  searchControl = new FormControl();
  filtroPokemon$ = this.searchControl.valueChanges.pipe(
    filter((valorDigitado) => {
      return valorDigitado!.length >= 1 || !valorDigitado;
    })
  );
  @Output() pokemonsPesquisados = new EventEmitter<any>();

  constructor(private pokemonsService: PokemonsService) {
    console.log(this.filtroInicial);
  }

  ngOnInit(): void {
    this.searchControl.setValue(this.filtroInicial, { emitEvent: false });
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
