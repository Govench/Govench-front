import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../../core/services/password-recovery/email-password.service';
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
  private resetPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
        next: () => {
          alert('Contraseña restablecida exitosamente.');
          this.router.navigate(['/password/confirmation']);
        },
        error: (err) => {
          console.error('Error al restablecer la contraseña:', err);
          
          // Manejo de errores según el código de estado
          if (err.status === 404) {
            alert('El token no fue encontrado. Intente nuevamente.');
          } else if (err.status === 410) {
            alert('El token ha expirado. Por favor, solicite uno nuevo.');
          } else if (err.status === 409) {
            alert('La nueva contraseña no puede ser igual a la actual.');
          } else {
            alert('No se pudo restablecer la contraseña. Intente nuevamente.');
          }
        },
      });
    } else {
      alert('Por favor, ingrese una contraseña válida.');
    }
  }

  goBack() {
    this.router.navigate(['/auth/forgot-password']);
  }
}