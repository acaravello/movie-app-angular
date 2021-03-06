
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MovieDetailService } from './movie-detail.service';
import { takeUntil, } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
  })
  export class MovieDetailComponent implements OnInit {
    
    movieDetail: any;
    showDetail: boolean = false;
    posterPath: string = null;
    backgroundImagePath: string = "https://image.tmdb.org/t/p/original";
    movieDetailBackgroundPath: string = null;
    private unsubscribeAll: Subject<any>;

    constructor(private router: Router, private movieDetailService: MovieDetailService, private location: Location) {
      this.unsubscribeAll = new Subject();
    }
  
    ngOnInit(): void {

      this.posterPath = null;

      this.movieDetailService.onMovieDetailChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(movie => {

          this.movieDetail = movie;
          this.posterPath = "https://image.tmdb.org/t/p/w500" + this.movieDetail.poster_path;

          if(this.movieDetail) {
            this.showDetail = true;
            this.movieDetailBackgroundPath ='url(' + this.backgroundImagePath + this.movieDetail.backdrop_path + ' )';
          } else {
            this.showDetail = false;
          }

      });
    }

    moneyFormatting(money) {
      if(money && money !== 0) {
        let userDataFormatted = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return " $" + userDataFormatted;
      } else {
        return null;
      }
    }

    goingBack() {
      this.location.back();
    }
  
  }