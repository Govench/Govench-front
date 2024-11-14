import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { EventUser } from '../../models/userEvent/user-event.model';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { EventService } from '../../../core/services/event/event.service';

@Component({
  selector: 'app-events-create',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent {
  eventsuser: EventUser[];
  private eventUserService = inject(EventUserService);
  private router = inject(Router);
  private eventService = inject(EventService);
  private snackbar = inject(MatSnackBar);
  
  modal = false;
  eventToDelete: EventUser | null = null;

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

  navigateToCreateEvents(): void {
    this.router.navigate(['/organizer/eventos/creados/crear']);
  }

  navigateToEditEvents(): void {
    this.router.navigate(['/organizer/eventos/creados/editar']);
  }

  openDeleteModal(event: EventUser): void {
    this.eventToDelete = event;  // Guarda el evento a eliminar
    this.modal = true;           // Muestra el modal
  }

  closeModal(): void {
    this.modal = false;           // Oculta el modal
    this.eventToDelete = null;    // Reinicia el evento a eliminar
  }

  confirmDeleteEvent(): void {
    if (this.eventToDelete) {
      this.eventService.eliminarEvento(this.eventToDelete.id).subscribe({
        next: () => {
          this.showSnackbar('Evento eliminado con éxito');
          this.myEventsCreate(); // Recarga la lista de eventos
          this.closeModal();     // Cierra el modal
        },
        error: () => {
          this.showSnackbar('Error al eliminar el evento');
          this.closeModal();
        }
      });
    }
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000, verticalPosition : 'top'
    });
  }
}
