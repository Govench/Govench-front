import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './password-confirmation.component.html',
  styleUrl: './password-confirmation.component.scss'
})
export class PasswordConfirmationComponent {
  constructor(private router: Router) {}

  onFinish() { 
    this.router.navigate(['/auth/login']);
  }
}
