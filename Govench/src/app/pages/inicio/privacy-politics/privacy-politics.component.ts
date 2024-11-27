import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { NavComponent } from "../../../shared/components/nav/nav.component";

@Component({
  selector: 'app-privacy-politics',
  standalone: true,
  imports: [FooterComponent, NavComponent],
  templateUrl: './privacy-politics.component.html',
  styleUrl: './privacy-politics.component.scss'
})
export class PrivacyPoliticsComponent {

}
