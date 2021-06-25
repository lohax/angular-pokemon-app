import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonsService } from './pokemons.service';
  
@Component({
    selector: 'detail-pokemon',
    templateUrl: './app/pokemons/detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {
  
    // pokemons: Pokemon[] = null;
    pokemon: Pokemon = null;
  
    constructor(
        private route: ActivatedRoute, 
        private router: Router, 
        private pokemonsService: PokemonsService,
        private titleService: Title
    ) {}
  
    ngOnInit(): void {
        //this.pokemons =  this.PokemonsService.getPokemons();;
        let id = +this.route.snapshot.paramMap.get('id');
        this.pokemonsService.getPokemon(id)
            .subscribe(pokemon => {
                this.pokemon = pokemon;
                this.titleService.setTitle(`Informations sur ${pokemon.name}`);
            });
        // snapshot fait attendre l'appli pour avoir l'id, le + caste en nombre
        // for (let i = 0; i < this.pokemons.length; i++) {
        //     if (this.pokemons[i].id == id) {
        //         this.pokemon = this.pokemons[i];
        //     }
        // }
    }
  
    goBack(): void {
        this.router.navigate(['/pokemon/all']);
        //window.history.back(); est aussi possible
    }

    goEdit(pokemon: Pokemon): void {
        let link =  ['/pokemon/edit', pokemon.id]
        this.router.navigate(link);
    }

    delete(pokemon: Pokemon): void {
		this.pokemonsService.deletePokemon(pokemon)
			.subscribe( _ => this.goBack());
	}

  
}