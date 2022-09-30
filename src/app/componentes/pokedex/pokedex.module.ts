import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexComponent } from './pokedex.component';

@NgModule({
  declarations: [PokedexComponent],
  imports: [CommonModule, PokedexRoutingModule],
  exports: [PokedexComponent],
})
export class PokedexModule {}
