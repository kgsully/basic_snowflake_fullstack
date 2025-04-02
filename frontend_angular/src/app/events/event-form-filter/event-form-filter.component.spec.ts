import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormFilterComponent } from './event-form-filter.component';

describe('EventFormFilterComponent', () => {
  let component: EventFormFilterComponent;
  let fixture: ComponentFixture<EventFormFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
