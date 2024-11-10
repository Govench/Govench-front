import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { Inscription } from '../../models/inscriptionEvent/inscription-event-model';  

@Component({
  selector: 'app-events-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-register.component.html',
  styleUrl: './events-register.component.scss'
})
export class EventsRegisterComponent {

  eventsIncriptions: Inscription[];
  private eventService= inject(EventUserService);

  ngOnInit(): void {
    this.myInscriptionssEvents();
  }

  myInscriptionssEvents() {
    this.eventService.getMyEventsInscriptions().subscribe(
      (inscription) => {
        this.eventsIncriptions = inscription;
        console.log('Eventos inscritos:', this.eventsIncriptions);
      }
      );
  }

}
