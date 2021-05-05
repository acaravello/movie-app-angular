
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
    imageRootPath: string = "https://image.tmdb.org/t/p/original";
    private unsubscribeAll: Subject<any>;

    movies = ["ciao", "miao", "bau"]

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
                console.log("Movie list in component");
                console.log(this.moviesList)
            });
    }
  
  }