
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { takeUntil, } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PopularMoviesService } from './popular-movies.service';

@Component({
    selector: 'popular-movied',
    templateUrl: './popular-movies.component.html',
    styleUrls: ['./popular-movies.component.scss']
  })
  export class PopularMoviesComponent implements OnInit {
  
    moviesList: any;
    movieListSorted: any;
    imageRootPath: string = "https://image.tmdb.org/t/p/original";
    private unsubscribeAll: Subject<any>;

    
    sortingSelected: string = "";

    constructor(
      private router: Router,
      private popularMoviesService: PopularMoviesService
    ) 
      {
        this.unsubscribeAll = new Subject();
     }
  
    ngOnInit(): void {

     this.popularMoviesService.onMovieListChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(movies => {
                this.moviesList = movies;
                this.movieListSorted = movies;
                console.log("Movie list in component");
                console.log(this.moviesList)
            });
    }

    sortMovies() {

      let sortedArray = [...this.moviesList];
      switch(this.sortingSelected) {

        case 'vote-desc':
          sortedArray.sort((a,b) => {
            return Number(b.vote_average) - Number(a.vote_average);
          });
          break;

        case 'vote-asc': 
        sortedArray.sort((a,b) => {
          return Number(a.vote_average) - Number(b.vote_average);
          
        });
        break;

        case 'release-desc':
          sortedArray.sort((a,b) => {
            return +new Date(b.release_date) - +new Date(a.release_date);
          });
          break;
        
        case 'release-asc':
          sortedArray.sort((a, b) => {
            return +new Date(a.release_date) - +new Date(b.release_date);
          });
          break;

        default:
          break;
      }

      this.movieListSorted = [...sortedArray];
    }

    toMovieDetail(movieId: string) {
      this.router.navigate(['detail/' + movieId]);
    }
  
  }