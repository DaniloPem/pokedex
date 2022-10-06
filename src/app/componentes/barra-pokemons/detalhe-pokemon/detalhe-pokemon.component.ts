import { SalvarDadosService } from './../../salvar-dados.service';
import { map } from 'rxjs/operators';
import { Pokemon } from './../../pokemons';
import { PokemonsService } from '../../pokemons.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  pokemonsTodos!: string[];
  nomePokemon!: string;
  imagemPokemon!: string;
  pokemon!: Object;
  tiposPokemon!: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private salvarDadosService: SalvarDadosService
  ) {}

  ngOnInit(): void {
    this.pokemonsService.listarPokemons().subscribe((res: any) => {
      this.pokemonsTodos = res.results.map((pokemon: any) => pokemon.name);
    });
    this.activatedRoute.params.subscribe(() => {
      this.nomePokemon = this.activatedRoute.snapshot.paramMap.get(
        'nome'
      ) as string;
      this.pokemonsService
        .pegarPokemon(this.nomePokemon)
        .subscribe((res: any) => {
          this.pokemon = res;
          this.imagemPokemon =
            res.sprites.other['official-artwork'].front_default;
          this.tiposPokemon = res.types.map((obj: any) => obj.type.name);
        });
    });
  }

  voltarListaPokemons() {
    this.router.navigate(['']);
  }

  proximoPokemon() {
    const posicaoPokemon = this.pokemonsTodos.indexOf(this.nomePokemon);
    if (posicaoPokemon !== this.pokemonsTodos.length - 1) {
      const proximaPosicao = posicaoPokemon + 1;
      const nomeProximoPokemon = this.pokemonsTodos[proximaPosicao];
      this.router.navigate(['/pokemon', nomeProximoPokemon]);
    }
  }

  anteriorPokemon() {
    const posicaoPokemon = this.pokemonsTodos.indexOf(this.nomePokemon);
    if (posicaoPokemon > 0) {
      const anteriorPosicao = posicaoPokemon - 1;
      const nomeAnteriorPokemon = this.pokemonsTodos[anteriorPosicao];
      this.router.navigate(['/pokemon', nomeAnteriorPokemon]);
    }
  }
}
