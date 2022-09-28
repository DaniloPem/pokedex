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
  next: string | null = null;
  previous: string | null = null;
  numeroPagina: number = 0;

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.buscarPokemon().subscribe((res: any) => {
      this.pokemonsTodos = res;
      this.pokemons = this.pokemonsTodos.slice(0, 20);
    });
  }

  carregarPokemons(pokemonsFiltrados: any) {
    this.pokemonsTodos = pokemonsFiltrados;
    this.pokemons = this.pokemonsTodos.slice(0, 20);
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
  }
}
