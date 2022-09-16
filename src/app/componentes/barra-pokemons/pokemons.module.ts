import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RetratoPokemonComponent } from './retrato-pokemon/retrato-pokemon.component';
import { PokemonsComponent } from './pokemons.component';

@NgModule({
  declarations: [
    RetratoPokemonComponent,
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  exports: [
    PokemonsComponent
  ]
})
export class PokemonsModule {}
