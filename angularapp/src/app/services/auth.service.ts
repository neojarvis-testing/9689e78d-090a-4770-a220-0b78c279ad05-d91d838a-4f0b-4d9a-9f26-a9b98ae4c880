import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://8080-eeddcfeffbaaaafafeddafbdafabaec.premiumproject.examly.io';

  constructor(private http: HttpClient) {}

  // User registration
  registerUser(userData: any): Observable<{ message: string }> {
    return this.http.post<{ message: string}>(`${this.apiUrl}/user/signup`, userData);
  }

  // User login
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, credentials);
  }
}