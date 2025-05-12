import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://8080-edeafbaaaafafeddafbdafabaec.project.examly.io';

  constructor(private readonly http: HttpClient) {}

  // User registration
  registerUser(userData: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/user/signup`, userData)
      .pipe(catchError(this.handleError));
  }

  // User login
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // Email verification
  verifyEmail(email: string): Observable<{ success:boolean }> {
    return this.http.post<{ success:boolean }>(`${this.apiUrl}/user/verifyEmail`, { email })
      
  }

  // Reset password
  resetPassword(email: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/user/resetPassword`, { email, newPassword })
      .pipe(catchError(this.handleError));
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error); // Log full error object
  
    // ✅ Extract only the error message from `error.error.message`
    const errorMessage = error.error?.message ?? 'Something went wrong! Please try again.';
  
    return throwError(() => errorMessage); // ✅ Return only the extracted message
  }
  getToken():string|null{
    return localStorage.getItem('token');
  }
}