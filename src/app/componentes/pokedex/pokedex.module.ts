import { PokemonsModule } from './../barra-pokemons/pokemons.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexComponent } from './pokedex.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PokedexComponent],
  imports: [CommonModule, PokedexRoutingModule, PokemonsModule, FlexLayoutModule],
  exports: [PokedexComponent],
})
export class PokedexModule {}
