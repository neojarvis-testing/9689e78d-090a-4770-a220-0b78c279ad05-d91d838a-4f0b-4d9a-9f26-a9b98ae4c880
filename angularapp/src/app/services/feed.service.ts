// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FeedService {

//   constructor() { }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feed } from '../models/feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  private readonly backendUrl = 'https://8080-edeafbaaaafafeddafbdafabaec.premiumproject.examly.io'
  private getHeaders() {
    const token = localStorage.getItem('authToken'); // Retrieve token from storage
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  // Fetch all feeds
  getAllFeeds(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.backendUrl}/feed/getAllFeeds`);
  }

  // Get feed by ID
  getFeedById(id: string): Observable<Feed> {
    return this.http.get<Feed>(`${this.backendUrl}/feed/getFeedById/${id}`);
  }

  // Add new feed
  addFeed(feed: Feed): Observable<Feed> {
    console.log(feed);
    return this.http.post<Feed>(`${this.backendUrl}/feed/addFeed`, feed);
  }

  //  Update existing feed
  updateFeed(id: string, feed: Feed): Observable<Feed> {
    return this.http.put<Feed>(`${this.backendUrl}/feed/updateFeed/${id}`, feed);
  }

  // Delete feed
  deleteFeed(id: string): Observable<any> {
    return this.http.delete<{ message: string }>(`${this.backendUrl}/feed/deleteFeed/${id}`);
  }
}

