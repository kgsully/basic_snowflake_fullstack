import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-display',
  imports: [],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit{
  events: any;

  constructor(private dbService: DatabaseService, private router: Router) {}

  @Output() errorReceived = new EventEmitter<string>();

  ngOnInit(): void {
    this.dbService.getEvents().subscribe((data) => {
      this.events = data;
      if (this.events.error) {
        this.router.navigate(['error'], { queryParams: {message: this.events.error} });
      }
    });
  }
}
