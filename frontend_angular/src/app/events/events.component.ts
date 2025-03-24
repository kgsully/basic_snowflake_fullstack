import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { HouseEvent } from '../models/event.model';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: HouseEvent[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
      this.getEvents();
  }

  async getEvents() {
    const response: any = await this.dbService.getEvents();
      if (response.error) {
        this.router.navigate(['error'], { queryParams: {message: response.error} });
      }
      this.events = response;
  }

}
