import { PokemonsService } from '../../pokemons.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { forkJoin } from 'rxjs';

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
  forcasPokemon!: string[];
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
          this.pegarDebilidadesFortalecas(this.tiposPokemon);
          console.log(this.tiposPokemon.length);
        });
    });
  }

  pegarDebilidadesFortalecas(tiposPokemon: string[]) {
    if (tiposPokemon.length === 1) {
      // this.buscarFraquezasEFortalecas(
      //   tiposPokemon[0],
      //   this.fraquezasPokemon,
      //   this.forcasPokemon,
      //   this.imunidadesPokemon
      // );
    }
    if (tiposPokemon.length === 2) {
      let fraquezasTipo1: string[] = [];
      let fraquezasTipo2: string[] = [];
      let forcasTipo1: string[] = [];
      let forcasTipo2: string[] = [];
      let imunidadesTipo1: string[] = [];
      let imunidadesTipo2: string[] = [];
      // this.buscarFraquezasEFortalecas(
      //   this.tiposPokemon[0],
      //   fraquezasTipo1,
      //   forcasTipo1,
      //   imunidadesTipo1
      // );
      // this.buscarFraquezasEFortalecas(
      //   this.tiposPokemon[1],
      //   fraquezasTipo2,
      //   forcasTipo2,
      //   imunidadesTipo2
      // );
      //fraquezas
      forkJoin({
        tipo1: this.pokemonsService.buscarTipo(this.tiposPokemon[0]),
        tipo2: this.pokemonsService.buscarTipo(this.tiposPokemon[1]),
      }).subscribe(({ tipo1, tipo2 }) => {
        const ffiTipo1 = this.buscarFraquezasEFortalecas(tipo1);
        const ffiTipo2 = this.buscarFraquezasEFortalecas(tipo2);
        console.log(ffiTipo1, ffiTipo2);
        // fraquezasTipo1.push(...fraquezasTipo2);
        const setFraquezasTotais = new Set(
          ffiTipo1.fraquezas.concat(ffiTipo2.fraquezas)
        );
        const fraquezasTotais = [...setFraquezasTotais];
        const fraquezasEForcas = [
          ...fraquezasTotais,
          ...ffiTipo1.forcas,
          ...ffiTipo2.forcas,
        ];
        const repetidos = fraquezasEForcas.filter(
          (valor, index) => fraquezasEForcas.indexOf(valor) !== index
        );
        this.fraquezasPokemon = fraquezasEForcas.filter((fraquezaOuForca) => {
          return !repetidos.includes(fraquezaOuForca);
        });
      });
    }
  }

  buscarFraquezasEFortalecas(res: any) {
    const fraquezas = res.damage_relations.double_damage_from.map(
      (obj: any) => obj.name
    );
    const imunidades = res.damage_relations.no_damage_from.map(
      (obj: any) => obj.name
    );
    const forcas = res.damage_relations.half_damage_from
      .map((obj: any) => obj.name)
      .concat(imunidades);
    return { fraquezas, forcas, imunidades };
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
