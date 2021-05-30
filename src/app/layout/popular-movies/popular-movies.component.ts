
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
    totalPages: number;
    currentPage: number;
    totalMovies: number;
    showAnimation: boolean = true;

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
            .subscribe(moviesInfo => {
                this.moviesList = [...moviesInfo.results];
                this.movieListSorted = [...moviesInfo.results];
                this.totalPages = moviesInfo.total_pages;
                this.totalMovies = moviesInfo.total_results;
                this.currentPage = moviesInfo.page;
                this.showAnimation = false;
                window.scroll(0,0);
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

    onPageChanged(page) {
      this.currentPage = page;
      this.popularMoviesService.getPopularMovies(page)
    }
  
  }