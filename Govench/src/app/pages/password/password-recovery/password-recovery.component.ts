import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../../core/services/password-recovery/email-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;
  isLoading: boolean = false;

  private emailPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  initiatePasswordReset() {
    if (this.passwordRecoveryForm.invalid) {
      this.showSnackBar('Por favor, ingrese un correo válido.', 'warning');
      return;
    }

    const email = this.passwordRecoveryForm.value.email;
    this.isLoading = true;

    this.emailPasswordService.emailExists(email).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.emailPasswordService.sendPasswordResetMail(email).subscribe({
            next: () => {
              this.isLoading = false;
              this.showSnackBar('Correo enviado. Revisa tu bandeja de entrada.', 'success');
              this.router.navigate(['/password/advice']);
            },
            error: (err) => {
              this.isLoading = false;
              this.handleError(err);
            }
          });
        } else {
          this.isLoading = false;
          this.showSnackBar('El correo ingresado no está registrado.', 'error');
        }
      },
      error: () => {
        this.isLoading = false;
        this.showSnackBar('Error al verificar el correo. Intente nuevamente.', 'error');
      }
    });
  }

  private handleError(err: any): void {
    console.error('Error al enviar el correo de restablecimiento:', err);
    switch (err.status) { 
      case 500: // Internal Server Error
        this.showSnackBar('Error en el servidor. Intente más tarde.', 'error');
        break;
      default:
        this.showSnackBar('No se pudo enviar el correo. Intente nuevamente.', 'error');
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
