import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './events-layout.component.html',
  styleUrl: './events-layout.component.scss'
})
export class EventsLayoutComponent {

}
