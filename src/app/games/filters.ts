import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameFilters } from '../model/game-filters';
import { output } from '@angular/core';
import { Game } from '../model/game';
import { SearchService } from '../model/search-service';
import { MechanicService } from '../model/mechanic-service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GenreService } from '../model/genre-service';

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters {

  faPlus = faPlus;
  faFilter = faFilter;
  showAdvancedFilters: boolean = false;
  showPlayersPopover = false;
  showDurationPopover = false;

  gamesOutput = output<Game[]>();
  searchService: SearchService = inject(SearchService);
  mechanicService: MechanicService = inject(MechanicService);
  genreService: GenreService = inject(GenreService);

  formOriginalValue: any;

  mechanics$ = this.mechanicService.getMechanics().pipe(
    map(m => m.sort((a, b) => a.name.localeCompare(b.name)))
  );

  genres$ = this.genreService.getGenres().pipe(
    map(g => g.sort((a, b) => a.name.localeCompare(b.name)))
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
    genres: new FormArray([])
  }, this.formValidator);

  onInit() {
    this.formOriginalValue = this.form.getRawValue();
  }

  getMechanicFormArray(): FormArray {
    return this.form.get('mechanics') as FormArray;
  }

  addMechanic() {
    const mechanicControl = new FormControl('');
    this.getMechanicFormArray().push(mechanicControl);
  }

  getGenreFormArray(): FormArray {
    return this.form.get('genres') as FormArray;
  }

  addGenre() {
    const genreControl = new FormControl('');
    this.getGenreFormArray().push(genreControl);
  }

  onSubmit() {
    const rawValues = this.form.value;
    const formValues: GameFilters = {
      name: rawValues.gameName ?? null,
      minPlayers: rawValues.minPlayerNumber ?? null,
      maxPlayers: rawValues.maxPlayerNumber ?? null,
      playingTime: rawValues.playingTime !== '' && rawValues.playingTime !== null ? Number(rawValues.playingTime) : null,
      mechanics: rawValues.mechanics ?? [],
      genres: rawValues.genres ?? []
    };

    this.searchService.search(formValues).subscribe(
      data => {
        this.gamesOutput.emit(data);
      }
    );
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  togglePlayersPopover() {
    this.showPlayersPopover = !this.showPlayersPopover;
  }

  toggleDurationPopover() {
    this.showDurationPopover = !this.showDurationPopover;
  }

}
