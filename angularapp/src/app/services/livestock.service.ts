import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livestock } from '../models/livestock';
import { map } from 'rxjs/operators'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {

  constructor(private readonly http: HttpClient, private readonly sanitizer: DomSanitizer) { }

  private readonly apiUrl:string='https://8080-accecafecdeeafbaaaafafeddafbdafabaec.project.examly.io'

  //get all livestocks
  getAllLivestocks():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/livestock/getAllLivestock`)
  }

  //  Get livestock by ID
  getLivestockById(id: string): Observable<Livestock> {
    return this.http.get<Livestock>(`${this.apiUrl}/livestock/getLivestockById/${id}`);
  }

  //  Add new livestock
  addLivestock(formData:FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/livestock/addLivestock`,formData);
  }

  //  Update existing livestock
  updateLivestock(id: string, formData: FormData): Observable<Livestock> {
    return this.http.put<Livestock>(`${this.apiUrl}/livestock/updateLivestock/${id}`, formData);
  }

  //  Get livestock by user ID with pagination and search
  getLivestockByUserId(userId: string): Observable<Livestock[]> {
    return this.http.get<Livestock[]>(`${this.apiUrl}/livestock/getLivestockByUserId/${userId}`);
  }

  //  Delete livestock
  deleteLivestock(id: string): Observable<{message:string}> {
    return this.http.delete<{message:string}>(`${this.apiUrl}/livestock/deleteLivestock/${id}`);
  }

  //  Get livestock by user ID (owner-specific)
  getLivestockByUserIdOwner(userId: string): Observable<Livestock> {
    return this.http.post<Livestock>(`${this.apiUrl}/livestock/getLivestockByUserId/${userId}`, { userId });
  }
  getFileByLivestockId(id:string):Observable<SafeUrl>{
    return this.http.get(`${this.apiUrl}/liveStock/getFileByLivestockId/${id}/file`,{responseType:'blob'}).pipe(
      map(file=>{
        const objectURL=URL.createObjectURL(file);
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
    )
  }
}