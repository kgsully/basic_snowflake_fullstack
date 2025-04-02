import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseEvent } from '../../models/event.model';
import { dateValidator } from './validator-date';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-event-form-add',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './event-form-add.component.html',
  styleUrl: './event-form-add.component.css'
})
export class EventFormAddComponent {

  @Output() addEvent = new EventEmitter<HouseEvent>;

  constructor(private dbService: DatabaseService) {}

  eventsAddForm = new FormGroup({
    houseNameInput: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/[A-Za-z]/)]),
    eventNameInput: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9]/)]),
    dateInput: new FormControl('', [Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/), dateValidator()]),
    familyInput: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/[A-Za-z']/)]),
  })

  submitEvent() {
    const newEvent = {
      HOUSENAME: this.eventsAddForm.value.houseNameInput!.toUpperCase() || '',
      EVENTNAME: this.eventsAddForm.value.eventNameInput || '',
      DATE: this.eventsAddForm.value.dateInput || undefined,
      FAMILY: this.eventsAddForm.value.familyInput || ''
    }

    this.addEvent.emit(newEvent);
  }
}
