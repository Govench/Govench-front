import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { AuthResponse } from '../../models/auth/auth-response-model';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private authService = inject(AuthServiceService);
  router = inject(Router)
  isAuthenticated: boolean = false;
  data : AuthResponse | null;
  link: string;
  ngOnInit()
  {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.data = this.authService.getUser();
    this.setLinkTipe();
  }

  logout():void{
    this.authService.logout();
    this.isAuthenticated=false;
    this.router.navigate(['/auth/login']);
  }

  setLinkTipe()
  {
    if(this.authService.getUser()?.role==='ROLE_ORGANIZER')
      {
        this.link='organizer/cuenta';
      }
      else
      {
        this.link='participant/cuenta';
      }
  }
}
