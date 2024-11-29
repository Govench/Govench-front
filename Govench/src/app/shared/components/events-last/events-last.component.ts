import { booleanAttribute, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { Inscription } from '../../models/inscriptionEvent/inscription-event-model';
import { EventUser } from '../../models/userEvent/user-event.model';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, RequiredValidator, Validators, FormBuilder } from '@angular/forms';
import { EventService } from '../../../core/services/event/event.service';
import { RatingEventService } from '../../../core/services/ratingEvent/ratingevent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events-last',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-last.component.html',
  styleUrls: ['./events-last.component.scss']
})
export class EventsLastComponent {

  rankeventform: FormGroup;
  modal = false;
  ratingModal = false;
  actualDate:string;
  eventsPast: Inscription[];
  filterevents :Inscription[];
  selectedEvent!: Inscription;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  verification: boolean = false;
  ratedEvents: Set<number> = new Set();

  private eventUserService = inject(EventUserService);
  private router = inject(Router);
  private eventService = inject(EventService);
  private ratingEventSerice = inject(RatingEventService);
  private snackbar = inject(MatSnackBar);
  ngOnInit(): void {
    this.myEventsPast();
    
  }


  constructor(private fb: FormBuilder) {
    this.rankeventform = this.fb.group({
      valorPuntuacion: ['', [Validators.required]],
    });
  }

  myEventsPast() {
    this.eventUserService.getMyEventsInscriptions().subscribe(
      (event) => {
        this.eventsPast = event.filter(event => !event.deleted);;
        console.log("eventspas", this.eventsPast)
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        this.actualDate = today.toISOString().split('T')[0];
  
 
        this.filterevents = this.eventsPast.filter(event => {
          const eventDate = new Date(event.date); 
          return eventDate < today; 
        });
        console.log("Pasados", this.filterevents)

        this.checkAllEventsRated();
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }
  deleteEventCreate(): void{
    this.modal = true;
   }


 
  checkAllEventsRated(): void {
    this.eventsPast.forEach((event) => {
      this.ratingEventSerice.verificationRating(event.eventId).subscribe({
        next: (response) => {
          if (response) {
            this.ratedEvents.add(event.eventId);
          }
        },
      });
    });
  }

  
  isEventRated(eventId: number): boolean {
    return this.ratedEvents.has(eventId);
  }

 
  openRatingModal(event: Inscription): void {
    this.selectedEvent = event;
    this.ratingModal = true;
    this.rating = 0;
  }

 
  closeRatingModal(): void {
    this.ratingModal = false;
    this.selectedEvent = null!;
  }

 
  setRating(star: number): void {
    this.rating = star;
  }


  submitRating(): void {
    if (this.rating === 0) {
      
      this.showSnackbar('Por favor selecciona una puntuación.');
      return;
    }

    const ratingRequest = { valorPuntuacion: this.rating };

    this.eventService.rateEvent(this.selectedEvent?.eventId, ratingRequest).subscribe({
      next: (response) => {
        this.showSnackbar(`¡Gracias por calificar este evento!\nPuntuación: ${this.rating}`);
        this.ratedEvents.add(this.selectedEvent?.eventId); 
        this.closeRatingModal();
      },
      error: (err) => {
        this.showSnackbar(err.error)
      }
    });
  }

  navigateToLastEvent(): void {
    this.router.navigate(['/organizer/eventos/pasados']);
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000, verticalPosition: 'top'
    });
  }

}