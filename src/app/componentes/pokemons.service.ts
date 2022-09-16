import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private httpClient: HttpClient) { }

  listarPokemons() {
  return this.httpClient.get(`${API_URL}/pokemon/`, {params: { offset: 0, limit: 7 }});
  }
}