import { Component, OnInit } from '@angular/core';
import { House, isHouseArray } from '../../models/house.model'
import { HouseEvent, isHouseEventArray } from '../../models/event.model'
import { DatabaseService } from '../../database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiError, isApiError } from '../../models/error.model';

@Component({
  selector: 'app-house-detail',
  imports: [],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit {
  baseUrl: string = '';
  houseName: string = '';
  house!: House;
  houseLoaded = false;
  houseNotFound = false;
  houseEvents: HouseEvent[] = [];
  eventsLoaded = false;
  eventsNotFound = false;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.baseUrl = this.dbService.baseUrl;
  }

  ngOnInit(): void {
    this.houseName = this.route.snapshot.paramMap.get('houseName') || '';
    this.getHouse();
    this.getHouseEvents();
  }

  async getHouse() {
    try {
      const response: House[] | any = await this.dbService.getHouseByName(this.houseName);
      if(isHouseArray(response)) {
        this.house = response[0];
        this.houseLoaded = true;
      } else if (response.length === 0) {
        this.houseNotFound = true;
      } else {
        this.router.navigate(['error'], { queryParams: { message: response.error }});
      }
    } catch (error: any) {
      this.router.navigate(['error'], { queryParams: { message: error.error }});
    }
  }

  async getHouseEvents() {
    try {
      const response: HouseEvent[] | any = await this.dbService.getEventsByHouse(this.houseName);
      if(isHouseEventArray(response) && response.length > 0) {
        this.houseEvents = response;
        this.eventsLoaded = true;
      } else if (response.length === 0) {
        this.eventsNotFound = true;
      } else {
        this.router.navigate(['error'], { queryParams: { message: response.error }});
      }
    } catch (error: any) {
      this.router.navigate(['error'], { queryParams: { message: error.error }});
    }
  }

}
