import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { Student } from './student/student';
import { Teacher } from './teacher/teacher';

export const routes: Routes = [{
    path: 'login',
    component: Login
  },
  {path:'admin',
    component:Admin
  },
  {path:'teacher',
    component:Teacher
  },
  {path:'student',
    component:Student
  }];
