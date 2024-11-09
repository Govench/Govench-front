import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { RegisterRequest } from '../../../shared/models/register/register-request-model';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar); 

  constructor() {
    this.registerForm = this.fb.group({
      username: [
        '', 
        [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)] // Solo letras y espacios
      ],
      email: [
        '', 
        [Validators.required, Validators.email]
      ],
      password: [
        '', 
        [Validators.required, Validators.minLength(8)]
      ],
      confirmPassword: [
        '', 
        [Validators.required]
      ],
      birthDate: [
        '', 
        [Validators.required, this.validateBirthDate]
      ],
      gender: ['', Validators.required],
      profileDescription: ['', Validators.maxLength(250)],
      termsAccepted: [false, Validators.requiredTrue]
    }, { 
      validators: this.passwordsMatchValidator
    });
  }

  validateBirthDate(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? { invalidDate: true } : null;
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registrationData = this.registerForm.value;
      this.showSnackBar('Registro exitoso');
      // Aquí puedes añadir la lógica de envío de datos
    } else {
      this.showSnackBar('Por favor complete todos los campos correctamente');
    }
  }
  
  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}