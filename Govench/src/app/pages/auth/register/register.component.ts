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
  maxDate: string;
  minDate: string;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private authService = inject(AuthServiceService);

  constructor() {
    this.registerForm = this.fb.group({
      name: [
        '', 
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastname: [
        '', 
        [Validators.required, Validators.minLength(2)]
      ],
      birthday: [
        '', 
        [Validators.required]
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
        '' ,[Validators.required, Validators.minLength(8)]
      ],
      termsAccepted: [false, Validators.requiredTrue]
    }, { 
      validators: this.passwordsMatchValidator
    }as AbstractControlOptions);
  }



  // Formatear fechas a YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

 
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  controlHasError(control: string, error: string): boolean {
    return this.registerForm.controls[control]?.hasError(error);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData: RegisterRequest = {
        name: this.registerForm.value.name,
        lastname: this.registerForm.value.lastname,
        birthday: this.registerForm.value.birthday,
        gender: this.registerForm.value.gender,
        profileDesc: this.registerForm.value.profileDesc,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.authService.register(userData).subscribe({
        next: () => {
          this.showSnackBar('Usuario creado correctamente');
          this.router.navigate(['auth/login']);
        },
        error: (error) => {
          this.showSnackBar(error.error);
        },
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}