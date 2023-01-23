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
import { SemTracoPipe } from 'src/app/pipes/sem-traco.pipe';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule, MAT_SELECT_SCROLL_STRATEGY} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    RetratoPokemonComponent,
    PokemonsComponent,
    BarraPesquisaComponent,
    DetalhePokemonComponent,
    SemTracoPipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
  ],
  exports: [PokemonsComponent],
})
export class PokemonsModule {}
