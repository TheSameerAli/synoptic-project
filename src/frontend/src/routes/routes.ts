import { HomePageComponent } from './../app/pages/home/home-page/home-page.component';
import { Routes } from '@angular/router';
import { CategoryPageComponent } from '../app/pages/category/category-page/category-page.component';
import { PlaylistPageComponent } from '../app/pages/playlist/playlist-page/playlist-page.component';
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'categories',
    component: CategoryPageComponent,
  },
  {
    path: 'playlists',
    component: PlaylistPageComponent
  }
];
