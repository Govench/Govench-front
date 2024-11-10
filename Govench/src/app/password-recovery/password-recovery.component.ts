import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {
  passwordRecoveryForm: FormGroup;
  showConfirmationMessage: boolean = false;
  showRecoveryTokenInput: boolean = false;
  tokenSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      recoveryToken: ['']
    });
  }

  onSubmit() {
    if (!this.showRecoveryTokenInput) {
      // Primer paso: validación y envío de correo
      if (this.passwordRecoveryForm.get('email')?.valid) {
        console.log('Correo:', this.passwordRecoveryForm.value.email);
        this.showConfirmationMessage = true;
        this.showRecoveryTokenInput = true;
      } else {
        // Si el correo es inválido, mostrar error
        this.passwordRecoveryForm.get('email')?.markAsTouched();
      }
    } else {
      // Segundo paso: validación del token
      this.tokenSubmitted = true;
      const tokenValue = this.passwordRecoveryForm.get('recoveryToken')?.value;
      if (tokenValue === 'token de backend') {
        console.log('Token de recuperación válido:', tokenValue);
        this.passwordRecoveryForm.get('recoveryToken')?.setErrors(null);
      } else {
        this.passwordRecoveryForm.get('recoveryToken')?.setErrors({ invalidToken: true });
      }
    }
  }
}