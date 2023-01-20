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
  optionsTipos = [{ name: 'all' }];
  optionsRegioes = [{ name: 'all' }];
  @Input() tipoSelecionado!: string;
  @Input() filtroInicial!: string;
  tiposControl = new FormControl();
  searchControl = new FormControl();
  filtroTipoPokemon$ = this.tiposControl.valueChanges;
  filtroPokemon$ = this.searchControl.valueChanges.pipe(
    filter((valorDigitado) => {
      return valorDigitado!.length >= 1 || !valorDigitado;
    })
  );
  @Output() pokemonsPesquisados = new EventEmitter<any>();
  @Output() pokemonsFiltradosPorTipo = new EventEmitter<any>();

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.tiposControl.setValue(this.tipoSelecionado);
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
    this.filtroTipoPokemon$.subscribe((res: any) => {
      this.pokemonsFiltradosPorTipo.emit(res);
    });
  }
}
