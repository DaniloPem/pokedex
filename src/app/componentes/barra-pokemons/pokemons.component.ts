import { SalvarDadosService } from './../salvar-dados.service';
import { Router } from '@angular/router';
import { PokemonsService } from './../pokemons.service';
import { Pokemon } from './../pokemons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemonsTodos!: Pokemon[];
  pokemons!: Pokemon[];
  pokemonSelecionado: any;
  numeroPagina!: number;
  filtro!: string;

  constructor(
    private pokemonsService: PokemonsService,
    private salvarDadosService: SalvarDadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.numeroPagina = this.salvarDadosService.getPaginaPokedex() ?? 0;
    this.pokemonsService.buscarPokemon().subscribe((res: any) => {
      this.pokemonsTodos = res;
      this.pokemons = this.pokemonsTodos.slice(
        this.numeroPagina * 20,
        (this.numeroPagina + 1) * 20
      );
    });
  }

  carregarPokemons(filtro: string) {
    this.filtro = filtro;
    this.pokemonsService
      .buscarPokemon(this.filtro)
      .subscribe((pokemonsFiltrados: Pokemon[]) => {
        this.pokemonsTodos = pokemonsFiltrados;
        this.pokemons = this.pokemonsTodos.slice(0, 20);
      });
    this.numeroPagina = 0;
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
  }
}
