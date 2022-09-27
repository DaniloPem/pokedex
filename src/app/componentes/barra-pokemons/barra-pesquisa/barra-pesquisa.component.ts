import { PokemonsService } from './../../pokemons.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.scss'],
})
export class BarraPesquisaComponent implements OnInit {
  optionsTipos = [{ name: 'todos' }];
  optionsRegioes = [{ name: 'todos' }];
  searchControl = new FormControl();

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.listarTipos().subscribe((res: any) => {
      this.optionsTipos = this.optionsTipos.concat(res.results);
    });

    this.pokemonsService.listarRegioes().subscribe((res: any) => {
      this.optionsRegioes = this.optionsRegioes.concat(res.results);
    });
  }
}
