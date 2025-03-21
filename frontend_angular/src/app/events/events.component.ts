import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: any;

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.dbQuery('events').subscribe((data:any) => {
      if (data.error) {
        this.router.navigate(['error'], { queryParams: {message: data.error} });
      }
      this.events = data;
    });
  }
}
