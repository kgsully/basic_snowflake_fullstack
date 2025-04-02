import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, lastValueFrom, map, throwError } from 'rxjs';
import { House } from './models/house.model';
import { HouseEvent } from './models/event.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  baseUrl = 'http://localhost:5000/api/'

  constructor(private http: HttpClient) { }

  private apiGet<T>(route:string, queryParams?: Record<string, string | number>): Promise<T> {
    const url = `${this.baseUrl}${route}`
    let httpParams = new HttpParams();

    if(queryParams) {
      Object.keys(queryParams).forEach((key) => {
        httpParams = httpParams.set(key, queryParams[key].toString()); // httpParams is immutable, so calling.set returns a new instance, so we must reassign it each time
      });
    }
    // console.log(httpParams);

    return lastValueFrom(
      this.http.get<T>(url, { params: httpParams}).pipe(
        map(response => response), // Extracts just the data array
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => error);
        })
      )
    )
  }

  private apiPost(route:string, body: {[key: string]: string | number | undefined}): Promise<{[key: string]: number}> {
    const url = `${this.baseUrl}${route}`
    return lastValueFrom(
      this.http.post<{[key: string]: number}>(url, body).pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(() => error);
        })
      )
    )
  }

  getEvents(filters?: Record<string, string | number>): Promise<Event[]> {
    return this.apiGet<Event[]>('events', filters);
  }

  getEventsByHouse(houseName: string) {
    return this.apiGet<House[]>(`events/${houseName}`);
  }

  postEvent(newEvent: HouseEvent): Promise<any> {
    const body: { [key: string]: string | number | undefined } = { ...newEvent }; // typecast to conform with apiPost body typing
    return this.apiPost('events', body)
  }

  getHouses(): Promise<House[]> {
    return this.apiGet<House[]>('houses');
  }

  getHouseByName(houseName: string) {
    return this.apiGet<House[]>(`houses/${houseName}`);
  }

}
