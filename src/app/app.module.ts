import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from './page-not-found.componet'

import { PokemonsModule } from './pokemons/pokemons.module'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './in-memory-data.service'

import { FormsModule } from '@angular/forms'
import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
		// Le module HttpClientInMemoryWebApiModule intercepte les requêtes HTTP
		// et retourne des réponses simulées du serveur.
		// Retirer l'importation quand un "vrai" serveur est prêt pour recevoir des requêtes.
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    PokemonsModule,
    LoginRoutingModule, 
    AppRoutingModule// en dernier
  ],
  declarations: [
    AppComponent, 
    PageNotFoundComponent,
    LoginComponent
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})

export class AppModule { }
