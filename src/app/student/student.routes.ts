import { Routes } from '@angular/router';
import { Student } from './student';
import { HomeComponent } from '../home-component/home-component';

export const routes: Routes = [{
  path: '',
  component: Student,
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
