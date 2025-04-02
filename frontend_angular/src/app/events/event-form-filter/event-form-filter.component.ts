import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form-filter',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './event-form-filter.component.html',
  styleUrl: './event-form-filter.component.css'
})
export class EventFormFilterComponent {

  @Input() familyFilter!: string[];
  @Output() filterChange = new EventEmitter<any>();

  eventsFilterForm = new FormGroup({
    familySelect: new FormControl('All'),
    searchInput: new FormControl(''),
  });

  filterUpdate() {
    this.filterChange.emit(this.eventsFilterForm.value);
  }

}
