import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "../../../shared/components/nav/nav.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-participant-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavComponent, FooterComponent,RouterLink],
  templateUrl: './participant-layout.component.html',
  styleUrl: './participant-layout.component.scss'
})
export class ParticipantLayoutComponent {
  authService = inject(AuthServiceService);
  
  logout() :void
  {
    this.authService.logout();
  }
}
