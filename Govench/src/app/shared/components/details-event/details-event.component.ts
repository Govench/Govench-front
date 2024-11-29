import { afterNextRender, Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';
import { EventService } from '../../../../app/core/services/event/event.service';
import { EventsDetails } from '../../models/event/events-details.model';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";
import { EventUserService } from '../../../core/services/EventUser/eventUser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-event',
  standalone: true,
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss'],

  imports: [NavComponent, FooterComponent,ApiImgPipe,RouterLink,CommonModule]
})

export class DetailsEventComponent {
  event: EventsDetails;
  eventRatings: any[] = []; //nuevo ga
  authService = inject(AuthServiceService);
  router = inject(Router);
  eventService= inject(EventService);
  userEventService=inject(EventUserService);
  private snackbar = inject(MatSnackBar);
  
  ruta:string;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  private loadEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.fetchEventById(+eventId);
    }
  }

  private fetchEventById(id: number): void {
    this.eventService.getEventById(id).subscribe({
      next: (event) => this.event = event,
      error: (error) => console.error('Error al cargar el evento', error)
    });
  }



  public Inscribe() { 

    this.userEventService.inscribeInEvent(this.event.id).subscribe(
      (response) => {
        if (typeof response === 'string' && response.startsWith('https://')) {
          this.ruta = response;
          window.location.href = response;
        } else {
          if(this.event.cost<=0)
          {
            this.showSnackBar("Registro exitoso");
            this.router.navigate(['/eventos']);
          }
        }
      },
      (error) => {
        if (error.status === 409) { // Verifica el código de estado HTTP
          this.showSnackBar(error.error); // Muestra el mensaje en un snackbar o similar
        } else {
          console.error("Error inesperado:", error);
          this.showSnackBar("Ocurrió un error inesperado.");
        }
      }
    );
}

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }

  calculateAverageRating(): number {
    if (this.eventRatings.length === 0) {
      return 0; // No hay calificaciones
    }
    const totalRating = this.eventRatings.reduce((sum, rating) => sum + rating.value, 0);
    return totalRating / this.eventRatings.length;
  }  
}
