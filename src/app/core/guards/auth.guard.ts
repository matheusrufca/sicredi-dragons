import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) { return true; }

    return this.authService.getAuthState().pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.notificationService.notify('You must be logged in!', 'Error');
          this.router.navigate(['/auth']);
        }
      }));
  }
}
