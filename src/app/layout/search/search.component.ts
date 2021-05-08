
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { takeUntil, } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchService } from './search.service';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {
  
    moviesList: any;
    inputTyped: string = "";
    inputSearched: string = "";
    timeout: any;
    imageRootPath: string = "https://image.tmdb.org/t/p/original";
    private unsubscribeAll: Subject<any>;
  
    constructor(
      private router: Router,
      private searchService: SearchService
      ) {
        this.unsubscribeAll = new Subject();
     }
  
    ngOnInit(): void {
      this.searchService.onSearchResultsChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(movies => {
          this.moviesList = movies;
          console.log("Movie list in search component");
          console.log(this.moviesList)
      });
    }

    onFinishingTyping() {
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(() => {
        if(this.inputTyped.length > 2) {
          if(this.inputTyped !== this.inputSearched) {
            this.searchService.getSearchResult(this.inputTyped)
            this.inputSearched = this.inputTyped;
          }
          
        }
      }, 1500);
    }

    toMovieDetail(movieId: string) {
      this.router.navigate(['detail/' + movieId]);
    }
  
  }