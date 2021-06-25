import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
  
import { ListPokemonComponent } from './list-pokemon.component'
import { DetailPokemonComponent } from './detail-pokemon.component'
import { EditPokemonComponent } from './edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon.component';

import { AuthGuard } from '../auth-guard.service';
  
// les routes du module Pokémon - ordre important
const pokemonsRoutes: Routes = [
    {
        path: 'pokemon', // prefixe toutes les routes par pokemon
        canActivate: [AuthGuard],
        children: [
            { path: 'all', component: ListPokemonComponent },
            { path: 'add', component: AddPokemonComponent },
            { path: 'edit/:id', component: EditPokemonComponent },
            { path: ':id', component: DetailPokemonComponent },
        ]
    }
    
];
  
@NgModule({
    imports: [
        RouterModule.forChild(pokemonsRoutes)  // for child pour les sous modules - sinon c'est forroot a la racine
    ],
    exports: [
        RouterModule
    ]
})
export class PokemonRoutingModule { }