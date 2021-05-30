
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
  })
  export class NavigationComponent implements OnInit {
  

  
    constructor(private router: Router) {
     }
  
    ngOnInit(): void {
     
    }

    resetPagination() {
      localStorage.clear();
    }
  
  }