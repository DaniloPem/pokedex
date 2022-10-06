import { BarraPesquisaComponent } from './barra-pokemons/barra-pesquisa/barra-pesquisa.component';
import { PokemonsComponent } from './barra-pokemons/pokemons.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalvarDadosService {
  private pagina: number | undefined;
  private filtro: string | undefined;

  constructor() {}

  getPaginaPokedex(): number | undefined {
    return this.pagina;
  }

  getFiltroPesquisa() {
    return this.filtro;
  }

  setPaginaPokedex(valor: number) {
    this.pagina = valor;
  }

  setFiltroPesquisa(valor: string) {
    this.filtro = valor;
  }
}
