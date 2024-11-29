import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventsDetails } from '../../shared/models/event/events-details.model';
import { HomeService } from '../../core/services/home/home.service';
import { ApiImgPipe } from '../../core/pipes/api-img.pipe';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApiImgPipe, CommonModule, NavComponent, FooterComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  events: EventsDetails[] = [];
  filterEvents: EventsDetails[] = [];
  searchQuery: string = '';
  selectedDate: string = '';
  selectedExp: string = '';
  selectedLocation: string = '';
  private homeService = inject(HomeService);
  private router = inject(Router);  // Inyectamos el router

  ngOnInit() {
    this.homeService.getEvents().subscribe({
      next: (event) => {
        this.events = event.filter(event => !event.deleted);
        this.filterEvents = event.filter(event => !event.deleted);
      },
      error: (error) => console.error('Error al cargar los eventos', error)
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLocaleLowerCase();
    this.filterEvents = this.events.filter(event => {
      const matchesQuery = event.tittle.toLocaleLowerCase().includes(query) || event.exp.toLocaleLowerCase().includes(query);
      const matchesDate = this.selectedDate ? event.date === this.selectedDate : true;
      const matchesExp = this.selectedExp ? event.exp === this.selectedExp : true;
      const matchesLocation = this.selectedLocation ? event.location.district.toLocaleLowerCase().includes(this.selectedLocation.toLocaleLowerCase()) : true;

      return matchesQuery && matchesDate && matchesExp && matchesLocation;
    });
  }

  // Método para navegar al detalle del evento
  navigateToEventDetail(eventId: number): void {
    this.router.navigate(['/eventos', eventId]);
  }

}
