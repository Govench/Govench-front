import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  
  isAuthenticated: boolean = false;

  private authService = inject(AuthServiceService);

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
