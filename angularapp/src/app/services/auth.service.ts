import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://8080-eeddcfeffbaaaafafeddafbdafabaec.premiumproject.examly.io';

  constructor(private http: HttpClient) {}

  // Register user by sending data to backend API
  registerUser(userData: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, userData);
  }
}