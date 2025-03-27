import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  baseUrl = 'http://localhost:5000/api/'

  constructor(private http: HttpClient) { }

  apiGet<T>(route: string): Promise<T> {
    return lastValueFrom(
      this.http.get<{data: T}>(`${this.baseUrl}${route}`).pipe(
        map((response) => response.data),
        catchError((error) => {
          return throwError(() => error);
        })
      )
    )
  }

  getEvents(): Promise<Event[]> {
    return this.apiGet<Event[]>('events');
  }

}
