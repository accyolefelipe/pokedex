import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public settAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.settAllPokemons = res.results;
        this.getAllPokemons = this.settAllPokemons;
      },
      error =>{
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string){
    const filter = this.settAllPokemons.filter(( res: any ) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;

  }

}
