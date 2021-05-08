import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailService } from './movie-detail.service';

const routes: Routes = [
    {
        path     : '**',
        component: MovieDetailComponent,
        resolve  : {
            detailService: MovieDetailService
        }
    }
];

@NgModule({
    declarations   : [
        MovieDetailComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
    ],
    providers      : [
        MovieDetailService
    ],
})

export class MovieDetailModule
{
}
