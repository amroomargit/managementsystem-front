import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router)

  const role = auth.getRole();

  if(role === 'ROLE_ADMIN'){
    return true;
  }

  router.navigate(['/login']);
  return false;
};
