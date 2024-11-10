import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUser } from '../../models/userEvent/user-event.model';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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
  private router = inject(Router);

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
  navigateToCreateEvents(): void{
    this.router.navigate(['/organizer/profile/eventos/creados/crear'])
      
}
navigateToEditEvents(): void{
  this.router.navigate(['/organizer/profile/eventos/creados/editar'])
}

}
