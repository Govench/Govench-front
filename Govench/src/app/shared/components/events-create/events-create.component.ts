import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUser } from '../../models/userEvent/user-event.model';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-events-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-create.component.html',
  styleUrl: './events-create.component.scss'
})
export class EventsCreateComponent {

  eventsuser: EventUser[];
  private eventUserService= inject(EventUserService);


  ngOnInit(): void {
    this.myEventsCreate();
  }

  myEventsCreate() {
    this.eventUserService.getMyEventsCreate().subscribe(
      (eventUser) => {
        this.eventsuser = eventUser;
      }
    );
  }


}
