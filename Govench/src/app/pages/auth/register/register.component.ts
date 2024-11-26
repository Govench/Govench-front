import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
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
  private authService = inject(AuthServiceService)

  constructor() {
    this.registerForm = this.fb.group({
      name: [
        '', 
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      lastname: [
        '', 
        [Validators.required, Validators.minLength(3)]
      ],
      birthday: [
        '', 
        [Validators.required, this.validateBirthDate]
      ],
      gender: ['', Validators.required],
      profileDesc: ['', Validators.maxLength(250)],
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
      termsAccepted: [false, Validators.requiredTrue]
    }, { 
      validators: this.passwordsMatchValidator
    }as AbstractControlOptions);
  }

  validateBirthDate(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    
    if (selectedDate > today) {
      return { invalidDate: true }; // La fecha es en el futuro
    }
  
    if (selectedDate > minDate) {
      return { minDateError: true }; // La fecha no cumple con el mínimo de 10 años atrás
    }
  
    return null;
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
      const userData: RegisterRequest = { /* No usamos todos los datos del registerForm, por eso especificamos*/
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        birthday: this.registerForm.value.birthday,
        gender: this.registerForm.value.gender,
        profileDesc: this.registerForm.value.profileDesc,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      this.authService.register(userData).subscribe({
        next: () => {
          this.showSnackBar('Usuario creado correctamente');
          this.router.navigate(['auth/login']);
        },
        error: () => {
          this.showSnackBar('Ocurrio un error registrando la cuenta'); 
        }
      });
    }
  }
  
  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}