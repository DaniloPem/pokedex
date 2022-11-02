import { PokemonsService } from './../../pokemons.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrato-pokemon',
  templateUrl: './retrato-pokemon.component.html',
  styleUrls: ['./retrato-pokemon.component.scss'],
})
export class RetratoPokemonComponent implements OnInit {
  @Input() nomePokemon!: string;
  idPokemon!: number;
  urlImagem = '';

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService
      .pegarPokemon(this.nomePokemon)
      .subscribe((res: any) => {
        this.idPokemon = res.id;
        this.urlImagem = res.sprites.other['official-artwork'].front_default;
      });
  }
}
