import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../app/core/services/event/event.service';
import { EventResponse } from '../../models/event/eventResponse.model';
import { NavComponent } from "../nav/nav.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-details-event',
  standalone: true,
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss'],
  imports: [NavComponent, FooterComponent]
})
export class DetailsEventComponent implements OnInit {
  event: EventResponse;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
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

}
