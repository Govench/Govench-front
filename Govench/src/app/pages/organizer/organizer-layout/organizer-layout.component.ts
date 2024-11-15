import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "../../../shared/components/nav/nav.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavComponent, FooterComponent,RouterLink],
  templateUrl: './organizer-layout.component.html',
  styleUrl: './organizer-layout.component.scss'
})
export class OrganizerLayoutComponent {
  authService = inject(AuthServiceService);
  private router = inject(Router);
  ngOnInit()
  {


  }
  logout() :void
  {
    this.authService.logout();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
