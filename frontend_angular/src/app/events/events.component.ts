import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseEvent, isHouseEventArray } from '../models/event.model';
import { EventFormFilterComponent } from './event-form-filter/event-form-filter.component';
import { EventFormAddComponent } from './event-form-add/event-form-add.component';

@Component({
  selector: 'app-events',
  imports: [EventFormFilterComponent, EventFormAddComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: HouseEvent[] = [];
  eventsLoaded = false;
  familyFilter: string[] = ['All'];

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.getEvents(queryParams);
  }

  async getEvents(filter?: Record<string, string | number>) {
    try {
      const response: any = await this.dbService.getEvents(filter);
      if(isHouseEventArray(response)) {
        this.events = response
        this.eventsLoaded = true;
        this.updateFilter();
      } else {
        this.router.navigate(['error'], { queryParams: { message: response.error }});
      }
    } catch (error: any) {
      this.router.navigate(['error'], { queryParams: { message: error.message }});
    }
  }

  updateFilter() {
    this.familyFilter = ['All'];
    for(let event of this.events) {
      if(!this.familyFilter.includes(event.FAMILY)) {
        this.familyFilter.push(event.FAMILY);
      }
    }
  }

  async addEvent(newEvent: HouseEvent) {
    try {
      const response: any = await this.dbService.postEvent(newEvent);
      if(response.error) {
        this.router.navigate(['error'], { queryParams: { message: response.message, error: response.error }});
      } else {
        this.getEvents();
      }
    } catch (error: any) {
      this.router.navigate(['error'], { queryParams: { message: error.message }});
    }
  }

}
