import { Component, numberAttribute } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUser } from '../../models/userEvent/user-event.model';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { EventService } from '../../../core/services/event/event.service';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-events-create',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule, CommonModule],
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

   @ViewChild('deleteModal') deleteModal: ModalDeleteComponent;

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
     this.eventToDelete = event;
     this.deleteModal.openModal();
   }

   showSnackbar(message: string) {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

     deleteEventCreate(id:number){
      this.modal = true;
     this.eventService.eliminarEvento(id).subscribe({
       next: () => {
         this.showSnackbar('Evento eliminado con Exito!')
      },
      error: error => {
        this.showSnackbar('Error al borrar.');
      } 
      })
     } 

   closeModal(): void{
    this.modal = false;
   }

}
