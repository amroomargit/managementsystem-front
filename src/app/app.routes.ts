import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { Student } from './student/student';
import { Teacher } from './teacher/teacher';
import { studentGuard } from './guards/student-guard';
import { teacherGuard } from './guards/teacher-guard';
import { adminGuard } from './guards/admin-guard';

/*This is our routing table, it allows us to redirect to different sub-components within each of
the components (admin, teacher, and student). Although we could include everything in this one
table, it would become messy and hard to understand, so instead, this routing table routes us to
each of the individual routing tables we will create for each of the components*/
export const routes: Routes = [{
    path: 'login',
    component: Login
  },
  {path:'admin', //When in the browser, someone types http://localhost:4200/admin, that will redirect them to the routing table in admin.route.ts
    loadChildren:() =>
    import('./admin/admin.routes').then(r => r.routes),

    //add the below two lines for guard functionality
    canActivate:[adminGuard],
    loadComponent: () =>
      import('./admin/admin').then(m => m.Admin),
  },
  {path:'teacher',
    loadChildren:() =>
      import('./teacher/teacher.routes').then(r => r.routes),

    canActivate:[teacherGuard],
    loadComponent: () =>
      import('./teacher/teacher').then(m => m.Teacher),
  },
  {path:'student',
    loadChildren:() =>
      import('./student/student.routes').then(r => r.routes),

    canActivate:[studentGuard],
    loadComponent: () =>
      import('./student/student').then(m => m.Student),
  }];
