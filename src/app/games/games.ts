import { Component } from '@angular/core';
import { Filters } from "./filters";
import { Results } from "./results";

@Component({
  selector: 'app-games',
  imports: [Filters, Results],
  templateUrl: './games.html',
  styleUrl: './games.css'
})
export class Games {

}
