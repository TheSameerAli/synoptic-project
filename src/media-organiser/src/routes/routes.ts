import { HomePageComponent } from './../app/pages/home/home-page/home-page.component';
import { Routes } from '@angular/router';
import { CategoryPageComponent } from '../app/pages/category/category-page/category-page.component';
import { PlaylistPageComponent } from '../app/pages/playlist/playlist-page/playlist-page.component';
import { RootPageComponent } from '../app/pages/root/root-page/root-page.component';
import { PlaylistShowPageComponent } from '../app/pages/playlist/playlist-show-page/playlist-show-page.component';
export const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'files',
    component: HomePageComponent
  },
  {
    path: 'categories',
    component: CategoryPageComponent,
  },
  {
    path: 'playlists',
    component: PlaylistPageComponent
  },
  {
    path: 'playlist/:id',
    component: PlaylistShowPageComponent
  }
];
