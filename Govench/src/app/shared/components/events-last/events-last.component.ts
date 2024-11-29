import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from'../../../core/services/EventUser/eventUser.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Inscription } from '../../models/inscriptionEvent/inscription-event-model';


@Component({
  selector: 'app-events-last',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-last.component.html',
  styleUrl: './events-last.component.scss'
})
export class EventsLastComponent {
  modal = false;
  eventsPast: Inscription[];
  filterevents:Inscription[];
  actualDate:string;
  private eventUserService= inject(EventUserService);
  private router = inject(Router);

  ngOnInit():void {
    this.myEventsPast();

  }

  myEventsPast() {
    this.eventUserService.getMyEventsInscriptions().subscribe(
      (event) => {
        this.eventsPast = event.filter(event => !event.deleted);;
  
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Asegura que esté al inicio del día.
        this.actualDate = today.toISOString().split('T')[0];
  
        // Filtra eventos pasados
        this.filterevents = this.eventsPast.filter(event => {
          const eventDate = new Date(event.date); // Convierte a objeto Date
          return eventDate < today; // Compara si la fecha es anterior a hoy
        });

      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
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
