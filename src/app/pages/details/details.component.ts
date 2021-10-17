import { PokeApiService } from './../../service/poke-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public itsLoaded: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private pokeApiService : PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.itsLoaded = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }
}
