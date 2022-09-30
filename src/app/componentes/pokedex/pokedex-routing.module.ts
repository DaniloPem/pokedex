import { DetalhePokemonComponent } from './../detalhe-pokemon/detalhe-pokemon.component';
import { PokemonsComponent } from './../barra-pokemons/pokemons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: 'pokemon', component: DetalhePokemonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
