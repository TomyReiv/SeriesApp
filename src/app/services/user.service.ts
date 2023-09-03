import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from 'src/environments/enviroment';
import { User, loginResponse } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this.checkStatus().subscribe();
  }

  private readonly userUrl: string = enviroment.userUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.userUrl}/auth/login`;
    const body = { email, password }
    return this.http.post<loginResponse>(url, body)
      .pipe(
        tap(({ user, token }) => {
          this._currentUser.set(user)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token', token)
        }),
        map(() => true),

        catchError(err => throwError(() => err.error.message))
      )
  }

  checkStatus(): Observable<boolean> {
    const url = `${this.userUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) return of(false)

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<loginResponse>(url, { headers })
      .pipe(
        map(({ token, user }) => {
          this._currentUser.set(user)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token', token)

          return true
        }),

        catchError(() => {
          this._authStatus.set(AuthStatus.noAuthenticated)
          return of(false)
        })
      )
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.noAuthenticated);
  }
}


