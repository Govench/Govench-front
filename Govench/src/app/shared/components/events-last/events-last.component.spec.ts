import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLastComponent } from './events-last.component';

describe('EventsLastComponent', () => {
  let component: EventsLastComponent;
  let fixture: ComponentFixture<EventsLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsLastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
