import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'https://8080-eeddcfeffbaaaafafeddafbdafabaec.premiumproject.examly.io'; // Change this if needed

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); 
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  addRequest(requestObject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRequest`, requestObject, this.getHeaders());
  }

  getRequestsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRequestsByUserId/${userId}`, this.getHeaders());
  }

  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRequest/${requestId}`, this.getHeaders());
  }

  updateRequest(requestId: string, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateRequest/${requestId}`, request, this.getHeaders());
  }

  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllRequests`, this.getHeaders());
  }
}