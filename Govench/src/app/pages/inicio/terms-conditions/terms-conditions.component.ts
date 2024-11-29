import { Component } from '@angular/core';
import { NavComponent } from "../../../shared/components/nav/nav.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [NavComponent, FooterComponent],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent {

}
