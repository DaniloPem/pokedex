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
      forkJoin({
        tipo1: this.pokemonsService.buscarTipo(this.tiposPokemon[0]),
      }).subscribe(({ tipo1 }) => {
        const forcasEFrquezas = this.buscarFraquezasEFortalecas(tipo1);
        this.forcasPokemon = forcasEFrquezas.forcas;
        this.fraquezasPokemon = forcasEFrquezas.fraquezas;
      });
    }
    if (tiposPokemon.length === 2) {
      forkJoin({
        tipo1: this.pokemonsService.buscarTipo(this.tiposPokemon[0]),
        tipo2: this.pokemonsService.buscarTipo(this.tiposPokemon[1]),
      }).subscribe(({ tipo1, tipo2 }) => {
        const forcasEFraquezasTipo1 = this.buscarFraquezasEFortalecas(tipo1);
        const forcasEFraquezasTipo2 = this.buscarFraquezasEFortalecas(tipo2);
        const setFraquezasTotais = new Set(
          forcasEFraquezasTipo1.fraquezas.concat(
            forcasEFraquezasTipo2.fraquezas
          )
        );
        const setForcasTotais = new Set(
          forcasEFraquezasTipo1.forcas.concat(forcasEFraquezasTipo2.forcas)
        );
        const fraquezasTotais = [...setFraquezasTotais];
        const forcasTotais = [...setForcasTotais];
        const fraquezasEForcasTotais = [
          ...fraquezasTotais,
          ...forcasEFraquezasTipo1.forcas,
          ...forcasEFraquezasTipo2.forcas,
        ];
        this.fraquezasPokemon = fraquezasEForcasTotais.filter((fraqueza) => {
          return !forcasTotais.includes(fraqueza);
        });
        this.forcasPokemon = [
          ...new Set(
            fraquezasEForcasTotais.filter((forca) => {
              return !fraquezasTotais.includes(forca);
            })
          ),
        ];
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
