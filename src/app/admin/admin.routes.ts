import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AllTeachers } from './all-teachers/all-teachers';
import { AllStudents } from './all-students/all-students';
import { HomeComponent } from '../home-component/home-component';
import { AllCourses } from './all-courses/all-courses';

//ROUTING TABLE EXPLANATION...
/*After having been redirected here, by having typed http://localhost:4200/admin, since after the
/admin part at the end there is no additional path (like http://localhost:4200/admin/all-teachers,
http://localhost:4200/admin/all-students, etc), the empty path you see with the blank paranthesis
is selected (because http://localhost:4200/admin is what took us here, so basically ignore that, and
imagine the brower bar link is empty, that's what is happening, it's looking for the route after
/admin). That takes us to the admin homepage (technically made up by admin.html, admin.ts,
and admin.css, but of course .html is the actual physical page, so we'll refer to it from here on
out). In admin.html, we have links to the other components (the other sub-pages in admin like
all-teachers or all-students), and at the bottom we have <router-outlet />, which redirects us
back to here, the routing table, which is reading the path and taking us to the component/sub-page
selected. */

export const routes: Routes = [{
    path: '',
    component: Admin,
    children: [{
      path:'all-teachers', /*The reason we put all-teachers instead of /all-teachers is
      because if we were to include the "/", it basically resets the path, so there would be no
      http://localhost:4200/admin/all-teachers, it would just be
      http://localhost:4200/all-teachers*/
      component: AllTeachers
    },
    {
      path: 'all-students',
      component: AllStudents
    },
    {
      path:'all-courses',
      component:AllCourses
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
  }];
