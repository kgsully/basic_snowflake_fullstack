import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  url = 'http://localhost:5000/events'

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get(this.url);
  }

}
