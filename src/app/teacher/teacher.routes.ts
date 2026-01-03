import { Routes } from '@angular/router';
import { Teacher } from './teacher';
import { HomeComponent } from '../home-component/home-component';

export const routes: Routes = [{
  path:'',
  component: Teacher,
  children: [{
     path: 'home',
     component: HomeComponent
   },
   {
     path:'',
     redirectTo:'home',
     pathMatch:'full'
   }
 ]
 }]
