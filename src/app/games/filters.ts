import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameFilters } from '../model/game-filters';
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

  formValidator = (group: AbstractControl) => {
    const minPlayers = group.get('minPlayerNumber')?.value;
    const maxPlayers = group.get('maxPlayerNumber')?.value;

    if (minPlayers !== 0 && maxPlayers !== 0 && minPlayers > maxPlayers) {
      return { playerRangeError: true };
    }
    return null;
  };

  form = new FormGroup({
    gameName: new FormControl(''),
    minPlayerNumber: new FormControl(0),
    maxPlayerNumber: new FormControl(0),
    playingTime: new FormControl(''),
    mechanics: new FormArray([]),
    mechanic: new FormControl('')
  }, this.formValidator);

  onSubmit() {
    const rawValues = this.form.value;
    const formValues: GameFilters = {
      name: rawValues.gameName ?? null,
      minPlayers: rawValues.minPlayerNumber ?? null,
      maxPlayers: rawValues.maxPlayerNumber ?? null,
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
