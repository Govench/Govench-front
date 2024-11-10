import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPasswordService } from '../../../core/services/password-recovery/email-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;
  showRecoveryTokenInput: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailPasswordService: EmailPasswordService
  ) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recoveryToken: ['']
    });
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  initiatePasswordReset() {
    const email = this.passwordRecoveryForm.get('email')?.value;
    this.isLoading = true;
    console.log('Iniciando solicitud de recuperación de contraseña para:', email);
  
    this.emailPasswordService.forgotPassword(email).subscribe(
      (response) => {
        console.log('Estado de la respuesta:', response.status); 
        console.log('Cuerpo de la respuesta:', response.body);
        if (response.status === 201) {
          this.showRecoveryTokenInput = true;
          this.errorMessage = '';
        } else if (response.status === 404) {
          this.errorMessage = 'El correo no se encuentra registrado';
        } else if (response.status === 409) {
          this.errorMessage = 'Ya se envió un correo de recuperación a esta cuenta. Intente de nuevo en 1 hora.';
        }
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Hubo un error, por favor intente nuevamente';
        console.error('Error en la solicitud de recuperación de contraseña:', error);
        this.isLoading = false;
      }
    );
  }

  validateToken() {
    const token = this.passwordRecoveryForm.get('recoveryToken')?.value;
    this.emailPasswordService.validateToken(token).subscribe(
      (response) => {
        if (response.body === true) {
          localStorage.setItem('recoveryToken', token);
          this.router.navigate(['/new-password']);
        } else {
          this.errorMessage = 'El token es inválido o ha expirado. Verifique e intente nuevamente.';
        }
      },
      (error) => {
        this.errorMessage = 'Error al verificar el token. Intente nuevamente.';
        console.error('Error en la validación del token:', error);
      }
    );
  }
}
