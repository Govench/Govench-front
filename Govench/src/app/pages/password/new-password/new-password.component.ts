import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPasswordService } from '../../../core/services/password-recovery/email-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordRecoveryForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailPasswordService: EmailPasswordService
  ) {
    // Inicializar el formulario
    this.passwordRecoveryForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  goBack() {
    this.router.navigate(['/password/recovery']);
  }

  resetPassword() {
    if (this.passwordRecoveryForm.invalid) {
      return;
    }

    const newPassword = this.passwordRecoveryForm.get('newPassword')?.value;
    const confirmPassword = this.passwordRecoveryForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const token = localStorage.getItem('recoveryToken');
    if (!token) {
      this.errorMessage = 'No se encontró el token de recuperación. Intente nuevamente desde el proceso de recuperación.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.emailPasswordService.resetPassword(token, newPassword).subscribe(
      (response) => {
        if (response.status === 200) {
          this.router.navigate(['/password/confirmation']);
        } else {
          this.errorMessage = 'Hubo un problema al restablecer la contraseña. Intente nuevamente.';
        }
        this.isLoading = false;
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'La nueva contraseña no puede ser igual a la contraseña actual.';
        } else {
          this.errorMessage = 'Error en la solicitud. Verifique su conexión e intente nuevamente.';
        }
        this.isLoading = false;
      }
    );
  }
}
