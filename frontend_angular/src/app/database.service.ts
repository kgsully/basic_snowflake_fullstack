import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  baseUrl = 'http://localhost:5000/api/'

  constructor(private http: HttpClient) { }

  dbQuery(route: string) {
    return this.http.get(`${this.baseUrl}${route}`);
  }

  async getEvents() {
    return new Promise((resolve) => {
      this.dbQuery('events').subscribe((data:any) => {
        if (data.error) {
          resolve(data.error)
        }
        resolve(data.data);
      });
    });
  }

}
