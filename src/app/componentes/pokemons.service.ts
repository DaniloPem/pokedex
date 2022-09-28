import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const API_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private httpClient: HttpClient) {}

  listarPokemons() {
    return this.httpClient.get(`${API_URL}/pokemon/`, {
      params: { offset: 0, limit: 20 },
    });
  }

  listarTipos() {
    return this.httpClient.get(`${API_URL}/type/`, {
      params: { offset: 0, limit: 18 },
    });
  }

  listarRegioes() {
    return this.httpClient.get(`${API_URL}/region/`);
  }

  buscarPorUrl(url: string) {
    return this.httpClient.get(url);
  }

  buscarPokemon(valorBuscado?: string) {
    const nomeId = valorBuscado?.toLowerCase();
    return this.httpClient.get(`${API_URL}/pokemon/?limit=2000`).pipe(
      map((response: any) => {
        return response.results.filter(
          (pokemon: { name: string; url: string }) =>
            pokemon.name.includes(nomeId ?? '')
        );
      })
    );
  }
}
