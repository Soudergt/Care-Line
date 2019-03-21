import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.hasValidSession().pipe(
      map((authd: boolean) => {
        if (authd) { return true; }

        this.router.navigate(['login']);

        return false;
      }),
      catchError((err: Error) => {
        this.router.navigate(['login']);

        return of(false);
      })
    );
  }
}
