import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SIMULATED_DELAY = 500;
  private readonly AUTH_TOKEN_KEY = 'authToken';

  // BehaviorSubject holds the current auth state
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const initial = this.isBrowser() ? !!localStorage.getItem(this.AUTH_TOKEN_KEY) : false;
    this.isLoggedInSubject = new BehaviorSubject<boolean>(initial);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private hasToken(): boolean {
    return this.isBrowser() ? !!localStorage.getItem(this.AUTH_TOKEN_KEY) : false;
  }

  /**
   * Simulates a login request.
   * @returns Observable<boolean> - true if login is successful
   */
  login(username: string, password: string): Observable<boolean> {
    // Check for the correct fake credentials
    if (username === 'username' && password === 'password') {
      return of(true).pipe(
        delay(this.SIMULATED_DELAY),
        tap(() => {
          // On success, store a fake token and update state
          if (this.isBrowser()) {
            localStorage.setItem(this.AUTH_TOKEN_KEY, 'fake-jwt-token');
          }
          this.isLoggedInSubject.next(true);
        })
      );
    }

    // On failure, return an error
    return throwError(() => new Error('Invalid username or password')).pipe(
      delay(this.SIMULATED_DELAY)
    );
  }

  /** Logs the user out */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.AUTH_TOKEN_KEY);
    }
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
