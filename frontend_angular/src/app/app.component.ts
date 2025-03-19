import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend_angular';
  events: any;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

}
