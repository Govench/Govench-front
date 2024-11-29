import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../../core/services/password-recovery/email-password.service';

@Component({
  selector: 'app-validate-token',
  standalone: true,
  imports: [],
  templateUrl: './validate-token.component.html',
  styleUrl: './validate-token.component.scss'
})
export class ValidateTokenComponent {
  private resetPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.resetPasswordService.checkTokenValidity(token).subscribe({
        next: (isValid) => {
          if (isValid) {
            console.log('Token válido. Redirigiendo a restablecer contraseña.');
            this.router.navigate(['/password/new', token]);
          } else {
            console.error('Token inválido o expirado.');
            alert('El enlace de restablecimiento de contraseña es inválido o ha expirado. Vuelva a solicitar el token');
            this.router.navigate(['/auth/login']);
          }
        },
        error: (err) => {
          console.error('Error al validar el token:', err);
          alert('Ocurrió un error al validar el token. Intente nuevamente.');
          this.router.navigate(['/auth/login']);
        }
      });
    } else {
      console.warn('No se proporcionó ningún token.');
      this.router.navigate(['/auth/login']);
    }
  }
}