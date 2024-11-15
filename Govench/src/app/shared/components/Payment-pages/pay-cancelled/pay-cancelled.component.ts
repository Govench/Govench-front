import { Component } from '@angular/core';
import { NavComponent } from "../../nav/nav.component";
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-pay-cancelled',
  standalone: true,
  imports: [NavComponent, FooterComponent,RouterLink],
  templateUrl: './pay-cancelled.component.html',
  styleUrl: './pay-cancelled.component.scss'
})
export class PayCancelledComponent {

}
