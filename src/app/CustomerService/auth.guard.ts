import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      window.sessionStorage.setItem('isLoggedIn','true');
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}