import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { Pokemon } from './pokemon';

import { PokemonsService } from './pokemons.service';
  
@Component({
  selector: 'list-pokemon',
  templateUrl: './app/pokemons/list-pokemon.component.html'
})

export class ListPokemonComponent implements OnInit { 
  private pokemons : Pokemon[];
  private title : string = 'Liste des pokémons';

  constructor(
    private router: Router, 
    private pokemonsService: PokemonsService,
		private titleService: Title
  ) {}

  ngOnInit(): void {
		this.getPokemons();
	}

	getPokemons(): void {
		this.titleService.setTitle('Liste des pokémons');
		this.pokemonsService.getPokemons()
			.subscribe(pokemons => this.pokemons = pokemons);
	}

  selectPokemon(pokemon: Pokemon) {
    let link = ['/pokemon', pokemon.id]
    this.router.navigate(link);
    //alert(`Vous avez cliqué sur ${pokemon.name}`)
  }

}