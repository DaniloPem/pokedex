import { RouterModule } from '@angular/router';
import { DetalhePokemonComponent } from './detalhe-pokemon/detalhe-pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BarraPesquisaComponent } from './barra-pesquisa/barra-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RetratoPokemonComponent } from './retrato-pokemon/retrato-pokemon.component';
import { PokemonsComponent } from './pokemons.component';

@NgModule({
  declarations: [
    RetratoPokemonComponent,
    PokemonsComponent,
    BarraPesquisaComponent,
    DetalhePokemonComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
  ],
  exports: [PokemonsComponent],
})
export class PokemonsModule {}
