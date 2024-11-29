import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../core/services/event/event.service';
import { EventsDetails } from '../../../shared/models/event/events-details.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { RatingEventResponseDTO } from '../../models/ratingEvent/ratingeventResponse.model';

@Component({
  selector: 'app-rating-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-event.component.html',
  styleUrls: ['./rating-event.component.scss']
})
export class RatingEventComponent implements OnInit {

  eventId: number;
  eventDetails: EventsDetails | null = null;
  eventRatings: RatingEventResponseDTO[] = [];

  constructor(private route: ActivatedRoute, private eventService: EventService, private location: Location ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('eventId')!;
      this.loadEventDetails();
      this.loadEventRatings();
    });
  }

  loadEventDetails(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      (event: EventsDetails) => {
        this.eventDetails = event;
        console.log('Detalles del evento:', this.eventDetails);
      },
      (error) => {
        console.error('Error al cargar los detalles del evento:', error);
      }
    );
  }

  // Método para cargar las calificaciones del evento
  loadEventRatings(): void {
    this.eventService.getEventRatings(this.eventId).subscribe(
      (ratings) => {
        this.eventRatings = ratings;  // Almacena las calificaciones obtenidas
        console.log('Calificaciones del evento:', this.eventRatings);
      },
      (error) => {
        console.error('Error al cargar las calificaciones:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();  // Navega hacia atrás en el historial del navegador
  }
}