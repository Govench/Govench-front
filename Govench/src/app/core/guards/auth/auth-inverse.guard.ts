import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if(authService.isAuthenticated())
  {
    const userRole = authService.getUser();
    if (userRole?.role==='ROLE_ORGANIZER')
    {
      router.navigate(['/organizer']);
    } else if (userRole?.role==='ROLE_PARTICIPANT'){
      router.navigate(['/participant'])
    }
    if(userRole?.role==='ROLE_ADMIN')
    {
      router.navigate(['/participant'])
    }
    return false;
  }
  return true;
};
