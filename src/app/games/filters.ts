import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameFilters } from '../model/game-filters';
import { tap } from 'rxjs';
import { output } from '@angular/core';
import { Game } from '../model/game';
import { SearchService } from '../model/search-service';

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters {

  gamesOutput = output<Game[]>();
  searchService: SearchService;

  form = new FormGroup({
    gameName: new FormControl(''),
    minPlayerNumber: new FormControl(0),
    maxPlayerNumber: new FormControl(0),
    playingTime: new FormControl('')
  });

  onSubmit() {
    const rawValues = this.form.value;
    const formValues: GameFilters = {
      name: rawValues.gameName ?? null,
      minPlayerNumber: rawValues.minPlayerNumber ?? null,
      maxPlayerNumber: rawValues.maxPlayerNumber ?? null,
      playingTime: rawValues.playingTime ?? null
    };
    console.log('Form submitted:', formValues);
    this.searchService.search(formValues).subscribe(
      data => {
        this.gamesOutput.emit(data);
      }
    );

  }

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

}
