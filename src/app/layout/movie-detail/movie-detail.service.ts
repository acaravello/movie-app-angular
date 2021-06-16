
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import tempAPI from "../../../assets/api";

@Injectable()
export class MovieDetailService implements Resolve<any>
{

    onMovieDetailChanged: BehaviorSubject<any>;
    movieDetail: any;
    movieDetailId: string;
    
    constructor(
        private httpClient: HttpClient,
    )
    {
        this.onMovieDetailChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any
    {
        this.movieDetailId = route.params["movieId"];

        return new Promise((resolve, reject) => {
            
            Promise.all([this.getMovieDetail()])
            .then(
                ([files]) => {
                    resolve(null);
                },
                reject
            );
        });
    }

    
    getMovieDetail(): Promise<any> {

            return new Promise((resolve, reject) => { 

                let reqHeader = new HttpHeaders({ 
                    'Content-Type': 'application/json',
                 });

                 this.httpClient.get(`https://api.themoviedb.org/3/movie/${this.movieDetailId}?api_key=${tempAPI}&language=en-US`, {headers: reqHeader})
                     .subscribe((response: any) => {

                        console.log("Movie detail response")
                        console.log(response)

                        this.movieDetail = {...response}
                        this.onMovieDetailChanged.next(this.movieDetail);
                        resolve(response);

                        }, err => {
                         console.log("error in contacting movie db");
                         console.log(err)
                     }, reject);
        
                }
            );
    }

}
