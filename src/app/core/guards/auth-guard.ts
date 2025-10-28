import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Use the observable to check login state
  return auth.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // User is logged in, allow access
      } else {
        // User is not logged in, redirect to login page
        return router.createUrlTree(['/login']);
      }
    })
  );
};
