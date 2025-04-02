import { Component, OnInit } from '@angular/core';
import { House, isHouseArray } from '../models/house.model';
import { ApiError, isApiError } from '../models/error.model';
import { DatabaseService } from '../database.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-houses',
  imports: [RouterLink],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.css'
})
export class HousesComponent implements OnInit{
  baseUrl: string = '';
  houses: House[] = [];
  housesLoaded = false;

  constructor(private dbService: DatabaseService, private router: Router) {
    this.baseUrl = this.dbService.baseUrl;
  }

  ngOnInit(): void {
    this.getHouses();
  }

  async getHouses() {
    try {
      const response: House[] | any = await this.dbService.getHouses()
      if(isHouseArray(response)) {
        this.houses = response;
        this.housesLoaded = true;
      } else {
        this.router.navigate(['error'], { queryParams: { message: response.error }});
      }
    } catch (error: any) {
      this.router.navigate(['error'], { queryParams: { message: error.message }})
    }
  }

}
