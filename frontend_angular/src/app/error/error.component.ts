import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  errorMessage: string = '';

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.activeRoute.queryParams.subscribe((params) => {
        this.errorMessage = params['message'] || 'An Unknown Error Occured'
      });
  }

}
