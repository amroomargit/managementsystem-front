import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from './auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  //Skip login request because there is no token when logging in, the token comes after we log in
  if(req.url.includes('/users/login')){
    return next(req); //just think of this as a regular return statement
  }

  if(token){ //if the user has a JWT token...
    console.log('TOKEN IN INTERCEPTOR:', token);
    req = req.clone({ //create a new modified request...
      setHeaders: { //that includes...
        Authorization: `Bearer ${token}`//the authorization header
      }
    });
  }
  /*We do req = req.clone (which clones the request) because Angular HTTP requests are immutable,
  and since we cannot change the original request, but we need to add the authorization header,
  we create a clone of the request, set the header in the cloned request, then send it back out */

  return next(req);
};
