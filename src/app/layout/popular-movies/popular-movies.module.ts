import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PopularMoviesComponent } from './popular-movies.component';
import { PopularMoviesService } from './popular-movies.service';
import { MatCardModule, MatSelectModule } from '@angular/material';


const routes: Routes = [
    {
        path     : '**',
        component: PopularMoviesComponent,
        resolve  : {
            moviesService: PopularMoviesService
        }
    }
];

@NgModule({
    declarations   : [
        PopularMoviesComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
    ],
    providers      : [
        PopularMoviesService
    ],
})
export class PopularMoviesModule
{
}
