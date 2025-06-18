import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameFilters } from '../model/game-filters';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css'
})
export class Filters {
  form = new FormGroup ({
    gameName: new FormControl(''),
    minPlayerNumber: new FormControl(0),
    maxPlayerNumber: new FormControl(0),
    playingTime: new FormControl('')
  });
  http: HttpClient;

  onSubmit() {
    const rawValues = this.form.value;
    const formValues: GameFilters = {
      gameName: rawValues.gameName ?? null,
      minPlayerNumber: rawValues.minPlayerNumber ?? null,
      maxPlayerNumber: rawValues.maxPlayerNumber ?? null,
      playingTime: rawValues.playingTime ?? null
    };
    console.log('Form submitted:', formValues);
    this.http.get("/games.json").pipe(
      tap(data => {
        console.log('Data fetched:', data);
      })
    ).subscribe( (data: any) => {
      console.log('Data received:', data);
    });

  }

  constructor(http: HttpClient) {
    this.http = http;
  }

}
