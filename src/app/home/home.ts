import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchService } from '../model/search-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  ngOnInit(): void {
    this.searchService.game$.subscribe(games => {
      console.log('Games loaded:', games);
    });
  }
  searchService = inject(SearchService);
  
}
