
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import {Router} from "@angular/router"

@Injectable()
export class MovieDetailService implements Resolve<any>
{

    onMovieDetailChanged: BehaviorSubject<any>;
    
    constructor(
        private httpClient: HttpClient,
        private router: Router,
    )
    {
        this.onMovieDetailChanged = new BehaviorSubject([]);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
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

                resolve(null);

                // const token = this.authService.getToken();
                // let reqHeader = new HttpHeaders({ 
                //     'Content-Type': 'application/json',
                //     'Authorization': 'Bearer ' + token
                //  });
        
                //  this._httpClient.get(backendAddress + "hr/api/v1/user/list", {headers: reqHeader})
                //      .subscribe((response: any) => {

                //         this.allContactsReal = [...response];
                //         this.filterContacts();

                //         console.log("Contacts real are");
                //         console.log(this.contactsReal);

                //         resolve(this.contactsReal);

                //         }, err => {

                //          console.log("error in contacting be");
                //          console.log(err)
                //          if(err.error && err.error.status === "400.001") {
                //              console.log("Token is expired")
                //              this.authService.userLogout();
                //              this.router.navigate(["/login"]);
                //          }

                //      }, reject);
        
                }
            );
    }

}
