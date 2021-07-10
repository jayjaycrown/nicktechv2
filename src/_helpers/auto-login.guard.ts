import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.authService.currentUserSubject.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        console.log('Checking for previous token...');
        if (isAuthenticated) {
          // Directly open inside area
          console.log('Found previous token, automatic login');
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          console.log('No previous token Found');
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
