import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../auth';

export const teacherGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const role = auth.getRole();

  if(role === 'ROLE_TEACHER'){
    return true;
  }

  router.navigate(['/login']);
  return false;
};
