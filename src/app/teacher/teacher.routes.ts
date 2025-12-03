import { Routes } from '@angular/router';
import { Teacher } from './teacher';
import { AllCertificates } from './all-certificates/all-certificates';

export const routes: Routes = [{
  path:'',
  component: Teacher,
  children: [{
    path:'all-certificates',
    component: AllCertificates
  }]
}]
