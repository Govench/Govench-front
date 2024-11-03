import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { AuthRequest } from '../../../shared/models/auth/auth-request-model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform : FormGroup;

  private fb = inject(FormBuilder);
  private router= inject(Router);
  private snackbar = inject(MatSnackBar);
  private authService = inject(AuthServiceService);

  constructor()
  {
    this.loginform = this.fb.group (
      {
        email: ['', [Validators.required, Validators.email]],
        password : ['',[Validators.required,Validators.minLength(8)]]
      }
    )
  }

  controlHasError(control : string, error: string)
  {
      return this.loginform.controls[control].hasError(error);
  }

  onSumbit(){
    if(this.loginform.invalid)
    {
      return;
    }
    const loginData:AuthRequest=this.loginform.value
  
    this.authService.login(loginData).subscribe({
      next:() => {
        this.showSnackBar("Inicio de sesion exitoso")
        this.router.navigateByUrl('/user/profile');
      },
      error : (error) => {
        this.showSnackBar('Error en el inicio de sesion. Por favor, intenta de nuevo.');
      }

    });

  }

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
