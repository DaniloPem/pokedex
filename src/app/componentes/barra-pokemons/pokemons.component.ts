import { PokemonsService } from './../pokemons.service';
import { Pokemon } from './../pokemons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons!: Pokemon[];
  pokemonSelecionado: any;
  next: string | null = null;
  previous: string | null = null;

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService.listarPokemons().subscribe((res: any) => {
      this.pokemons = res.results;
      this.next = res.next;
      this.previous = res.previous;
    });
  }

  carregarPokemons(pokemonsFiltrados: any) {
    console.log(pokemonsFiltrados);
    this.pokemons = pokemonsFiltrados;
  }

  nextListaPokemons() {
    if (this.next !== null) {
      this.pokemonsService.buscarPorUrl(this.next).subscribe((res: any) => {
        this.pokemons = res.results;
        this.next = res.next;
        this.previous = res.previous;
      });
    }
  }

  previousListaPokemons() {
    if (this.previous !== null) {
      this.pokemonsService.buscarPorUrl(this.previous).subscribe((res: any) => {
        this.pokemons = res.results;
        this.next = res.next;
        this.previous = res.previous;
      });
    }
  }
}
