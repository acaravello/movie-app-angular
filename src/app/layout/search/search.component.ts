
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
  })
  export class SearchComponent implements OnInit {
  

  
    constructor(private router: Router) {
     }
  
    ngOnInit(): void {
     
    }
  
  }