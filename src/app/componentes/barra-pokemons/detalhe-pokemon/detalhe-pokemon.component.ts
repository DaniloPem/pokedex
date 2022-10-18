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
  pokemon!: any;
  nomePokemon!: string;
  imagemPokemon!: string;
  tiposPokemon!: string[];
  fraquezasPokemon!: string[];
  fortalecasPokemon!: string[];
  imunidadesPokemon!: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonsService: PokemonsService
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

  pegarDebilidadesFortalecas() {
    if (this.tiposPokemon.length === 1) {
      this.buscarFraquezasEFortalecas(
        this.tiposPokemon[0],
        this.fraquezasPokemon,
        this.fortalecasPokemon,
        this.imunidadesPokemon
      );
    }
    if (this.tiposPokemon.length > 1) {
      const fraquezasTipo1: string[] = [];
      const fraquezasTipo2: string[] = [];
      const fortalecasTipo1: string[] = [];
      const fortalecasTipo2: string[] = [];
      const imunidadesTipo1: string[] = [];
      const imunidadesTipo2: string[] = [];
      this.buscarFraquezasEFortalecas(
        this.tiposPokemon[0],
        fraquezasTipo1,
        fortalecasTipo1,
        imunidadesTipo1
      );
      this.buscarFraquezasEFortalecas(
        this.tiposPokemon[1],
        fraquezasTipo2,
        fortalecasTipo2,
        imunidadesTipo2
      );
      // método para pegar as debilidades e fortalecas de um pokemon com dois tipos
    }
  }

  buscarFraquezasEFortalecas(
    tipo: string,
    fraquezas: string[],
    fortalecas: string[],
    imunidades: string[]
  ) {
    this.pokemonsService.buscarTipo(tipo).subscribe((tipo: any) => {
      fraquezas = tipo.damage_relations.double_damage_from.map(
        (obj: any) => obj.name
      );
      fortalecas = tipo.damage_relations.half_damage_from.map(
        (obj: any) => obj.name
      );
      imunidades = tipo.damage_relations.no_damage_from.map(
        (obj: any) => obj.name
      );
      fortalecas.push(...imunidades);
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

  getDisplayId(id: number): string {
    return '#' + `00${id}`.slice(-3);
  }

  getPeso(peso: number) {
    const pesoConvertido = peso / 10;
    return `${pesoConvertido} kg`;
  }

  getAltura(altura: number) {
    const alturaConvertida = altura / 10;
    return `${alturaConvertida} m`;
  }
}
