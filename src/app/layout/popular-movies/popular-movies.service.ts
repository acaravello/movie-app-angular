
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import tempAPI from "../../../assets/tempAPI";

import {Router} from "@angular/router"

@Injectable()
export class PopularMoviesService implements Resolve<any>
{

    onMovieListChanged: BehaviorSubject<any>;
    popularMovies: any[]; 
    
    constructor(
        private httpClient: HttpClient,
        private router: Router,
    )
    {
        this.onMovieListChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            
            Promise.all([this.getPopularMovies()])
            .then(
                ([files]) => {
                    resolve(null);
                },
                reject
            );
        });
    }

    
    getPopularMovies(): Promise<any> {

            return new Promise((resolve, reject) => { 

                let reqHeader = new HttpHeaders({ 
                    'Content-Type': 'application/json',
                 });

                 this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${tempAPI}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, {headers: reqHeader})
                     .subscribe((response: any) => {

                        this.popularMovies = [...response.results]
                        console.log("Popular movies are");
                        console.log(this.popularMovies)
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
