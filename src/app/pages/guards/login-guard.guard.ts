import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from 'src/app/interfaces/auth-status.enum';
import { UserService } from 'src/app/services/user.service';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const url = state.url;
  localStorage.setItem('url', url);

  if( userService.authStatus() === AuthStatus.authenticated ){
    return true
  }

  if( userService.authStatus() === AuthStatus.checking ){
    return false
  }


  router.navigate(['/pages/Login']);
  return false;
};
