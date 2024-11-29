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
    console.log('Formulario de recuperación de contraseña iniciado.');
    
    if (this.passwordRecoveryForm.invalid) {
      this.showSnackBar('Por favor, ingrese un correo válido.', 'warning');
      console.log('Formulario inválido, correo no válido.');
      return;
    }

    const email = this.passwordRecoveryForm.value.email;
    console.log('Correo ingresado:', email);

    this.isLoading = true;

    console.log('Verificando si el correo existe...');
    this.emailPasswordService.emailExists(email).subscribe({
      next: (exists: boolean) => {
        console.log('Resultado de la verificación:', exists);  // Verificar valor de "exists"
        if (exists) {
          console.log('Correo encontrado, enviando correo de restablecimiento...');
          this.emailPasswordService.sendPasswordResetMail(email).subscribe({
            next: () => {
              this.isLoading = false;
              console.log('Correo enviado con éxito.');
              this.showSnackBar('Correo enviado. Revisa tu bandeja de entrada.', 'success');
              this.router.navigate(['/password/advice']);
            },
            error: (err) => {
              this.isLoading = false;
              console.error('Error al enviar correo:', err);  // Log de error
              this.handleError(err);
            }
          });
        } else {
          this.isLoading = false;
          console.log('El correo no está registrado.');
          this.showSnackBar('El correo ingresado no está registrado.', 'error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al verificar correo:', err);
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
    console.log(`Mostrando Snackbar: ${message} con tipo ${type}`);
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type
    });
  }

  goBack() {
    console.log('Volviendo a la pantalla de login...');
    this.router.navigate(['/login']);
  }
}