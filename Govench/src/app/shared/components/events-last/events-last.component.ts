import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from'../../../core/services/EventUser/eventUser.service';
import { EventUser } from'../../models/userEvent/user-event.model';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-events-last',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-last.component.html',
  styleUrl: './events-last.component.scss'
})
export class EventsLastComponent {
  modal = false;
  eventsPast: EventUser[];
  private eventUserService= inject(EventUserService);
  private router = inject(Router);

  ngOnInit():void {
    this.myEventsPast();
  }

  myEventsPast() {
    this.eventUserService.getMyEventsPast().subscribe(
      (event) => {
        this.eventsPast = event;
      });
  }

  deleteEventCreate(): void{
    this.modal = true;
   }

   closeModal(): void{
    this.modal = false;
   }

   navigateToLastEvent(): void {
    this.router.navigate(['/organizer/eventos/pasados']);
  }

}
