import { HomePageComponent } from './../app/pages/home/home-page/home-page.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  }
];
