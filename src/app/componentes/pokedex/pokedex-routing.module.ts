import { DetalhePokemonComponent } from '../barra-pokemons/detalhe-pokemon/detalhe-pokemon.component';
import { PokemonsComponent } from './../barra-pokemons/pokemons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PokemonsComponent },
  { path: 'pokemon/:nome', component: DetalhePokemonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
