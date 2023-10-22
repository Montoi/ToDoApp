import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  

  constructor(private http: HttpClient) { }

  private URL = environment.apiUrl + "noteApi";

  getNotes(): Observable<any> {
    return this.http.get<any>(this.URL);
  }
}
