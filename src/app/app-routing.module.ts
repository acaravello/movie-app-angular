import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'search',
    loadChildren: './layout/search/search.module#SearchModule'
},
{
    path        : 'detail',
    loadChildren: './layout/movie-detail/movie-detail.module#MovieDetailModule'
},
{
  path        : '**',
  loadChildren: './layout/popular-movies/popular-movies.module#PopularMoviesModule'
},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
