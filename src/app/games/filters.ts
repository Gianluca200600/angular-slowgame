import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameFilters } from '../model/game-filters';
import { output } from '@angular/core';
import { Game } from '../model/game';
import { SearchService } from '../model/search-service';
import { MechanicService } from '../model/mechanic-service';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { Mechanic } from '../model/mechanic';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters {

  faPlus = faPlus;
  gamesOutput = output<Game[]>();
  searchService: SearchService = inject(SearchService);
  mechanicService: MechanicService = inject(MechanicService);

  mechanics$ = this.mechanicService.getMechanics().pipe(
    map (m => m.sort((a, b) => a.name.localeCompare(b.name)))
  );

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
  }, this.formValidator);

  getMechanicFormArray(): FormArray {
    return this.form.get('mechanics') as FormArray;
  }

  addMechanic() {
    const mechanicControl = new FormControl('');
    this.getMechanicFormArray().push(mechanicControl);
  }

  onSubmit() {
    const rawValues = this.form.value;
    const formValues: GameFilters = {
      name: rawValues.gameName ?? null,
      minPlayers: rawValues.minPlayerNumber ?? null,
      maxPlayers: rawValues.maxPlayerNumber ?? null,
      playingTime: rawValues.playingTime ?? null,
      mechanics: rawValues.mechanics ?? []
    };
    console.log('Form submitted:', formValues);
    this.searchService.search(formValues).subscribe(
      data => {
        this.gamesOutput.emit(data);
      }
    );
  }

}
