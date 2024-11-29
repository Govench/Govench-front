import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../../core/services/password-recovery/email-password.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordRecoveryForm: FormGroup;
  private resetPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar); 
  token: string | null = null;

  constructor(private fb: FormBuilder) {
    this.passwordRecoveryForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.passwordRecoveryForm.valid && this.token) {
      const newPassword = this.passwordRecoveryForm.value.newPassword;

      this.resetPasswordService.resetPassword(this.token, newPassword).subscribe({
        next: (response: string) => {
          this.showSnackBar(response, 'success');
          this.router.navigate(['/password/confirmation']);
        },
        error: (err) => { 
          if (err.status === 404) {
            this.showSnackBar('El token no fue encontrado. Intente nuevamente.', 'error');
          } else if (err.status === 410) {
            this.showSnackBar('El token ha expirado. Por favor, solicite uno nuevo.', 'error');
          } else if (err.status === 409) {
            this.showSnackBar('La nueva contraseña no puede ser igual a la actual.', 'error');
          } else {
            this.showSnackBar('No se pudo restablecer la contraseña. Intente nuevamente.', 'error');
          }
        },
      });
    } else {
      this.showSnackBar('Por favor, ingrese una contraseña válida.', 'warning');
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type,  // Clase de estilo según el tipo (success, error, warning)
    });
  }
 
}