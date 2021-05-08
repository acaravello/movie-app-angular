
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import tempAPI from "../../../assets/tempAPI";

@Injectable()
export class SearchService implements Resolve<any>
{

    onSearchResultsChanged: BehaviorSubject<any>;
    searchResult: any[]; 
    
    constructor(
        private httpClient: HttpClient
    )
    {
        this.onSearchResultsChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any
    {
    }
    
    getSearchResult(searchInput: string): Promise<any> {

        return new Promise((resolve, reject) => { 

            let reqHeader = new HttpHeaders({ 
                'Content-Type': 'application/json',
             });

             this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=${tempAPI}&language=en-US&query=${searchInput}&page=1`, {headers: reqHeader})
                 .subscribe((response: any) => {

                     let responseDataFiltered = [...response.results];
                     for (let i = 0; i < responseDataFiltered.length; i++) {
                         if (!responseDataFiltered[i].poster_path || !responseDataFiltered[i].release_date || responseDataFiltered[i].release_date.length === 0) {
                             responseDataFiltered.splice(i, 1);
                             i--;
                         }
                     }

                    this.searchResult = [...responseDataFiltered];
                    this.onSearchResultsChanged.next(this.searchResult);
                    resolve(response);

                    }, err => {
                     console.log("error in contacting movie db");
                     console.log(err)
                 }, reject);
    
            }
        );

    }

}
