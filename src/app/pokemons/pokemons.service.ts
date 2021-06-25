import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
  
@Injectable()
export class PokemonsService {

	// le point d’accés à notre API
	private pokemonsUrl = 'api/pokemons';

	constructor(private http: HttpClient) { }

  private log(log: string) {
    console.log(log)
  }

  private handleError<T>(operation='operation', result?: T) { // operation = nom de method qui cause l'erreur
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      
      return of(result as T) // le T est pour renvoyer le bon type pour chaque type d'erreur
    }
  }

  /* GET pokemons search */
	searchPokemons(term: string): Observable<Pokemon[]> {
		if (!term.trim()) {
			// si le terme de recherche n'existe pas, on renvoie un tableau vide.
			return of([]);
		}

		return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
			tap(_ => this.log(`found pokemons matching "${term}"`)),
			catchError(this.handleError<Pokemon[]>('searchPokemons', []))
		);
	}


  /** PUT: update the pokemon on the server */
	updatePokemon(pokemon: Pokemon): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
			tap( _ => this.log(`updated pokemon id=${pokemon.id}`)),
			catchError(this.handleError<any>('updatePokemon'))
		);
	}

  /** DELETE pokemon */
	deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
		const url = `${this.pokemonsUrl}/${pokemon.id}`;
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		return this.http.delete<Pokemon>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
			catchError(this.handleError<Pokemon>('deletePokemon'))
		);
	}

		/** POST pokemon */
		addPokemon(pokemon: Pokemon): Observable<Pokemon> {
			const httpOptions = {
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			};
	
			return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, httpOptions).pipe(
				tap((pokemon: Pokemon) => this.log(`added pokemon with id=${pokemon.id}`)),
				catchError(this.handleError<Pokemon>('addPokemon'))
			);
		}
	

  
  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap( _ => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    )
  }
    
  // Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`
    
    return this.http.get<Pokemon>(url).pipe(
      tap( _ => this.log(`fetched pokemon id = ${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id = ${id}`))
    )
  }

  // Retourne la liste des types des Pokémons
	getPokemonTypes(): Array<string> {
		return [
			'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
		];
	}
}