import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('')
  public heroes: Hero [] = []
  public selectedHero?: Hero


  constructor(private heroesService: HeroesService){}

  searchHero(){
    const value: string = this.searchInput.value || ''

   this.heroesService.getSuggesstions(value)
    .subscribe(heroes => this.heroes = heroes)
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    if(!event.option.value){
      this.selectedHero = undefined
      return
    }
    const hero: Hero = event.option.value
    this.searchInput.setValue(hero.superhero)

    this.selectedHero = hero
  }
}
