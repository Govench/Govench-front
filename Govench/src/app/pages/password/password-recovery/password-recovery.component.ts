import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPasswordService } from '../../../core/services/password-recovery/email-password.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private snackBar: MatSnackBar

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailPasswordService: EmailPasswordService
  ) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recoveryToken: ['', Validators.required]
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
        if (response.status === 201) {
          this.showRecoveryTokenInput = true;  
          this.snackBar.open('Se ha enviado el token a su correo', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else if (response.status === 404) {
          this.snackBar.open('El correo no se encuentra registrado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        } else if (response.status === 409) {
          this.snackBar.open('Ya se envió un correo de recuperación a esta cuenta. Verique nuevamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open('Ya se envió un correo de recuperación a esta cuenta. Verique nuevamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
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
          localStorage.removeItem('recoveryTokenRequested');
          this.router.navigate(['/password/new']);
        } else {
          this.snackBar.open('El token es inválido o ha expirado. Verifique e intente nuevamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      },
      (error) => {
        this.snackBar.open('Error al verificar el token. Intente nuevamente.', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    );
  }
}
