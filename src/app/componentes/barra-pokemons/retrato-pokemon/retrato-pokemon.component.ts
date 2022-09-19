import { PokemonsService } from './../../pokemons.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrato-pokemon',
  templateUrl: './retrato-pokemon.component.html',
  styleUrls: ['./retrato-pokemon.component.scss'],
})
export class RetratoPokemonComponent implements OnInit {
  @Input() pokemonUrl!: string;
  urlImagem = '';

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonsService
      .buscarPokemon(this.pokemonUrl)
      .subscribe((res: any) => {
        this.urlImagem = res.sprites.other['official-artwork'].front_default;
      });
  }
}
