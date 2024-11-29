import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { Inscription } from '../../models/inscriptionEvent/inscription-event-model';  
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var bootstrap: any;

@Component({
  selector: 'app-events-register',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './events-register.component.html',
  styleUrls: ['./events-register.component.scss']
})
export class EventsRegisterComponent implements OnInit {
  modal = false;
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  eventsIncriptions: Inscription[] = [];
  private eventService = inject(EventUserService);

  eventLink: string = ''; // Variable para guardar el link del evento
  eventIdToDelete: number | null = null; // Variable para el id del evento a eliminar

  ngOnInit(): void {
    this.myInscriptionssEvents();
  }

  // Obtener las inscripciones del usuario y actualizar el estado
  myInscriptionssEvents(): void {
    this.eventService.getMyEventsInscriptions().subscribe(
      (inscription) => {
        this.eventsIncriptions = inscription.filter(event => !event.deleted);
        this.updateEventStatus(); // Llamamos a esta función para actualizar el estado de cada evento
        console.log('Inscripciones obtenidas correctamente:', this.eventsIncriptions);
      },
      (error) => {
        console.error('Error al obtener las inscripciones:', error);
      }
    );
  }

  // Eliminar inscripción
  deleteInscription(): void {
    if (this.eventIdToDelete !== null) {
      this.eventService.deleteUserEvent(this.eventIdToDelete).subscribe(
        response => {
          console.log('Inscripción eliminada correctamente:', response);
          this.myInscriptionssEvents(); // Actualiza la lista de inscripciones
          this.closeModal();
          this.showSnackBar('Se ha eliminado la inscripción del evento');
        },
        (error) => {
          console.error('Error al eliminar la inscripción:', error);
        }
      );
    }
  }

  // Mostrar snackbar
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });
  }

  // Establecer el enlace del evento en el modal
  setEventLink(link: string): void {
    this.eventLink = link;
  }

  // Establecer el id del evento a eliminar
  setEventIdToDelete(eventId: number): void {
    this.eventIdToDelete = eventId;
  }

  // Cerrar el modal
  closeModal(): void {
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  // Función que compara si el evento ha comenzado
  isEventStarted(startTime: string): boolean {
    const currentDateTime = new Date();
    const eventStartDateTime = new Date(startTime); // Convierte el startTime a un objeto Date
    return eventStartDateTime < currentDateTime; // Si el evento ha comenzado, devuelve true (deshabilita el botón)
  }

  // Método para actualizar el estado de los eventos
  updateEventStatus(): void {
    const currentDateTime = new Date();  // Fecha y hora actuales
    this.eventsIncriptions.forEach(event => {
      const eventDate = new Date();  // Obtén la fecha actual
      const eventTime = event.startTime.split(':');  // Separar la hora (HH:MM:SS)
      eventDate.setHours(parseInt(eventTime[0], 10), parseInt(eventTime[1], 10), 0, 0); // Establecer la hora en la fecha actual
  
      console.log('Fecha del evento:', eventDate);  // Para verificar el valor combinado
  
      // Si el evento ya ha comenzado, actualizar el estado como 1
      event.status = eventDate < currentDateTime ? 1 : 0;
    });
  }
  

  // Navegar a más eventos
  navigateMoreEvents(): void {
    this.router.navigateByUrl('/eventos');
  }
}