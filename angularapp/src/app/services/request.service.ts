import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'https://8080-eedceaeaffefbaaaafafeddafbdafabaec.premiumproject.examly.io'; // Change this if needed

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); 
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  addRequest(requestObject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/addRequest`, requestObject);
  }
  
  getRequestsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/request/getRequestsByUserId/${userId}`);
  }
  
  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/request/deleteRequest/${requestId}`);
  }
  
  updateRequest(requestId: string, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/request/updateRequest/${requestId}`, request);
  }
  
  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/request/getAllRequests`);
  }
}  