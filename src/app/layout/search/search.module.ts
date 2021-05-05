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
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';



const routes: Routes = [
    {
        path     : '**',
        component: SearchComponent,
        resolve  : {
            search: SearchService
        }
    }
];

@NgModule({
    declarations   : [
        SearchComponent,
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
        SearchService
    ],
})
export class SearchModule
{
}
