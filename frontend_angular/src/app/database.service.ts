import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  baseUrl = 'http://localhost:5000/'

  constructor(private http: HttpClient) { }

  dbQuery(route: string) {
    return this.http.get(`${this.baseUrl}${route}`);
  }

}
