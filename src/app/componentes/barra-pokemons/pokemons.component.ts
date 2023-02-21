import { SalvarDadosService } from './../salvar-dados.service';
import { Router } from '@angular/router';
import { PokemonsService } from './../pokemons.service';
import { Pokemon } from './../pokemons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  @ViewChild('botaoAnterior') botaoAnterior!: ElementRef<HTMLButtonElement>;

  pokemonsTodos!: Pokemon[];
  pokemons: Pokemon[] | undefined;
  pokemonSelecionado: any;
  numeroPagina!: number;
  filtro!: string;
  filtroPorTipo!: string;
  numeroTotalDePaginas!: number;

  constructor(
    private pokemonsService: PokemonsService,
    private salvarDadosService: SalvarDadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filtroPorTipo = this.salvarDadosService.getTipoPesquisa() ?? 'all';
    this.filtro = this.salvarDadosService.getFiltroPesquisa() ?? '';
    this.numeroPagina = this.salvarDadosService.getPaginaPokedex() ?? 0;
    this.carregarPokemons();
  }

  aplicarFiltro(filtro: string): void {
    this.filtro = filtro;
    this.numeroPagina = 0;
    this.carregarPokemons();
  }

  salvarTipo(tipo: string): void {
    this.filtroPorTipo = tipo;
    this.numeroPagina = 0;
    this.carregarPokemons();
  }

  carregarPokemons() {
    this.pokemonsService
      .buscarPokemon(this.filtro, this.filtroPorTipo)
      .subscribe((pokemonsFiltrados: Pokemon[]) => {
        this.pokemonsTodos = pokemonsFiltrados;
        this.numeroTotalDePaginas = Math.floor(this.pokemonsTodos.length / 20);
        this.pokemons = this.pokemonsTodos.slice(
          this.numeroPagina * 20,
          (this.numeroPagina + 1) * 20
        );
      });
    this.salvarDadosService.setFiltroPesquisa(this.filtro);
    this.salvarDadosService.setTipoPesquisa(this.filtroPorTipo);
  }

  proximaPagina() {
    this.numeroPagina++;
    const pokemonsProximaPagina = this.pokemonsTodos.slice(
      this.numeroPagina * 20,
      (this.numeroPagina + 1) * 20
    );
    if (pokemonsProximaPagina.length !== 0) {
      this.pokemons = pokemonsProximaPagina;
    } else {
      this.numeroPagina--;
    }
    this.salvarDadosService.setPaginaPokedex(this.numeroPagina);
  }

  anteriorPagina() {
    if (this.numeroPagina > 0) {
      this.numeroPagina--;
      const pokemonsProximaPagina = this.pokemonsTodos.slice(
        this.numeroPagina * 20,
        (this.numeroPagina + 1) * 20
      );
      this.pokemons = pokemonsProximaPagina;
    } else {
      this.numeroPagina = 0;
    }
    this.salvarDadosService.setPaginaPokedex(this.numeroPagina);
  }

  abrirDetalhePokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.name]);
    this.salvarDadosService.setPaginaPokedex(this.numeroPagina);
    this.salvarDadosService.setFiltroPesquisa(this.filtro);
  }
}
