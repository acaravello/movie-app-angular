
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import tempAPI from "../../../assets/tempAPI";

@Injectable()
export class PopularMoviesService implements Resolve<any>
{

    onMovieListChanged: BehaviorSubject<any>;
    popularMovies: any; 
    
    constructor(
        private httpClient: HttpClient,
    )
    {
        this.onMovieListChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([this.getPopularMovies(localStorage.getItem("currentMoviePage"))])
            .then(
                ([files]) => {
                    resolve(null);
                },
                reject
            );
        });
    }
    
    getPopularMovies(page = "1"): Promise<any> {

            return new Promise((resolve, reject) => { 

                let reqHeader = new HttpHeaders({ 
                    'Content-Type': 'application/json',
                 });

                 this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${tempAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`, {headers: reqHeader})
                     .subscribe((response: any) => {
                        
                        this.popularMovies = {...response}
                        localStorage.setItem("currentMoviePage", this.popularMovies.page);
                        this.onMovieListChanged.next(this.popularMovies);
                        resolve(response);

                        }, err => {
                         console.log("error in contacting movie db");
                         console.log(err)
                     }, reject);
        
                }
            );
    }

}
