import { Component, inject } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import { EventsDetails } from '../../shared/models/events/events-details.model';
import { HomeService } from '../../core/services/home/home.service';
import { ApiImgPipe } from '../../core/pipes/api-img.pipe';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,ApiImgPipe,CommonModule,NavComponent,FooterComponent,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  events : EventsDetails[] = [];
  filterEvents: EventsDetails[] = [];
  searchQuery: string = '';
  selectedDate: string = '';
  selectedExp: string = '';
  selectedLocation: string = '';
  private homeService = inject(HomeService)

  ngOnInit()
  {
    this.homeService.getEvents().subscribe({
      next:(event) => {
        this.events = event;
        this.filterEvents=event;
      },
      error:(error) => console.error('Error al cargar los eventos',error)
      });
    }

    onSearch():void {
      const query = this.searchQuery.toLocaleLowerCase();
      this.filterEvents = this.events.filter(event => {

        const matchesQuery = event.tittle.toLocaleLowerCase().includes(query) || event.exp.toLocaleLowerCase().includes(query);
  

        const matchesDate = this.selectedDate ? event.date === this.selectedDate : true;
  

        const matchesExp = this.selectedExp ? event.exp === this.selectedExp : true;
  

        const matchesLocation = this.selectedLocation ? event.location.district.toLocaleLowerCase().includes(this.selectedLocation.toLocaleLowerCase()) : true;
  

        return matchesQuery && matchesDate && matchesExp && matchesLocation;
      });
    }
  
  }
  


