import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly baseUrl = 'https://8080-edeafbaaaafafeddafbdafabaec.project.examly.io'; // Change this if needed

  constructor(private readonly http: HttpClient) {}

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
    return this.http.get<any>(`${this.baseUrl}/request/getAllRequests`);
  }
}  