import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../models/auth/auth-response-model';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private authService = inject(AuthServiceService);
  isAuthenticated: boolean = false;
  data : AuthResponse | null;

  ngOnInit()
  {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.data = this.authService.getUser();
  }

  logout():void{
    this.authService.logout();
    this.isAuthenticated=false;
  }

}
