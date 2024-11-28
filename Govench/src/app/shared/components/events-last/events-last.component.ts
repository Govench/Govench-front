import { booleanAttribute, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { EventUser } from '../../models/userEvent/user-event.model';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, RequiredValidator, Validators, FormBuilder } from '@angular/forms';
import { EventService } from '../../../core/services/event/event.service';
import { RatingEventService } from '../../../core/services/ratingEvent/ratingevent.service';

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
  eventsPast: EventUser[] = [];
  selectedEvent!: EventUser;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  verification: boolean = false;
  ratedEvents: Set<number> = new Set();

  private eventUserService = inject(EventUserService);
  private router = inject(Router);
  private eventService = inject(EventService);
  private ratingEventSerice = inject(RatingEventService);

  ngOnInit(): void {
    this.myEventsPast();
  }

  constructor(private fb: FormBuilder) {
    this.rankeventform = this.fb.group({
      valorPuntuacion: ['', [Validators.required]],
    });
  }

 
  myEventsPast() {
    this.eventUserService.getMyEventsPast().subscribe((events) => {
      this.eventsPast = events;
      this.checkAllEventsRated();
    });
  }

 
  checkAllEventsRated(): void {
    this.eventsPast.forEach((event) => {
      this.ratingEventSerice.verificationRating(event.id).subscribe({
        next: (response) => {
          if (response) {
            this.ratedEvents.add(event.id);
          }
        },
      });
    });
  }

  
  isEventRated(eventId: number): boolean {
    return this.ratedEvents.has(eventId);
  }

 
  openRatingModal(event: EventUser): void {
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
      alert('Por favor selecciona una puntuación.');
      return;
    }

    const ratingRequest = { valorPuntuacion: this.rating };

    this.eventService.rateEvent(this.selectedEvent?.id, ratingRequest).subscribe({
      next: (response) => {
        alert(`¡Gracias por calificar este evento!\nPuntuación: ${this.rating}`);
        this.ratedEvents.add(this.selectedEvent?.id); 
        this.closeRatingModal();
      },
      error: (err) => {
        console.error('Error al calificar el evento:', err);
      }
    });
  }

  navigateToLastEvent(): void {
    this.router.navigate(['/organizer/eventos/pasados']);
  }
}