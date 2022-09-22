import { PokemonsModule } from './../barra-pokemons/pokemons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex.component';

@NgModule({
  declarations: [PokedexComponent],
  imports: [CommonModule, PokemonsModule],
  exports: [PokedexComponent],
})
export class PokedexModule {}
