import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../../shared/components/nav/nav.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
