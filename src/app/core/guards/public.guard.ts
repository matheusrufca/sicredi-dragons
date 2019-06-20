import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PublicGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) { this.router.navigate(['/']); }

    return this.authService.getAuthState().pipe(
      take(1),
      map(user => !(!!user)),
      tap(async (isNotAuthenticated) => {
        if (isNotAuthenticated) { return true; }
        await this.router.navigate(['/']);
      }));
    // return this.auth.user.pipe(
    //  take(1),
    //  map(user => !!!user),
    //  tap(notAuthenticated => {
    //   if (!notAuthenticated) { this.router.navigate(['/']); }
    // }));
  }
}
