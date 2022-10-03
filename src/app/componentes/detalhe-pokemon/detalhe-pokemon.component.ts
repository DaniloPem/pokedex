import { PokemonsService } from './../pokemons.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  nomePokemon!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonsService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.nomePokemon = this.activatedRoute.snapshot.paramMap.get('nome');
  }

  navigate() {
    this.router.navigate(['']);
  }
}
