import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { User, AuthResponse } from '../../models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  private apiUrl = `${environment.uri}/auth`;

  constructor(private _http: HttpClient, private router: Router) { }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      map((response: AuthResponse) => {
        if (response?.token) {
          this.setToken(response.token);
        }
        return response;
      })
    );
  }

  saveUser(data: { name: string; email: string; password: string }): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}/register`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.tokenSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }
}

