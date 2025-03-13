import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): ReturnType<CanActivateFn> {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

export const authGuard: CanActivateFn = () => {
  return inject(AuthGuardService).canActivate();
}; 