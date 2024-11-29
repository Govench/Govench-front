import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { Inscription } from '../../models/inscriptionEvent/inscription-event-model';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-register.component.html',
  styleUrl: './events-register.component.scss'
})
export class EventsRegisterComponent {
  modal = false;
  private router = inject(Router);

  eventsIncriptions: Inscription[];
  private eventService= inject(EventUserService);

  ngOnInit(): void {
    this.myInscriptionssEvents();
  }

  myInscriptionssEvents() {
    this.eventService.getMyEventsInscriptions().subscribe(
      (inscription) => {
        this.eventsIncriptions = inscription.filter(event => !event.deleted);;
      }
      );
  }

  deleteEventCreate(): void{
    this.modal = true;
   }

   closeModal(): void{
    this.modal = false;
   }

   navigateToRegisterEvent(): void {
    this.router.navigate(['/organizer/eventos/registrados']);
  }

  navigateMoreEvents(){
    this.router.navigateByUrl('/eventos');
  }

}
