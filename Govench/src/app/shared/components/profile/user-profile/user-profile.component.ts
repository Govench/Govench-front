import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user/user-profile-model';
import { UserProfileService } from '../../../../core/services/user/user.profile.service';
import { AuthServiceService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  profileImageUrl: SafeUrl;
  passwordForm: FormGroup;
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private sanitizer=inject(DomSanitizer);
  private fb = inject(FormBuilder);

  constructor() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
  {
    validators: this.passwordMatchValidator
  });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile():void
  { const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getProfileImage(userId).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (error) => {
          console.error('Error al cargar la imagen de perfil:', error);
        }
      });
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito.');
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil');
        }
      }); 
    }
  }
  navigateToUpdateProfile(): void{
    if(this.authService.getUser()?.role=='ROLE_ORGANIZER')
    {
      this.router.navigate(['/organizer/cuenta/profile/update'])
    }
    else
    {
      this.router.navigate(['/participant/cuenta/profile/update'])
    }

  }

  updatePassword(){
    if(this.passwordForm.valid){
      const userId = this.authService.getCurrentUserId();
      const passData = this.passwordForm.value;
      this.authService.updatePassword(passData).subscribe({
        next: (response) => {
          this.passwordForm.reset();
          this.showSnackBar('Contraseña actualizada correctamente');
        },
        error: (error) => {
          const errorMessage = error.error;
          this.passwordForm.reset();
          this.showSnackBar(errorMessage);
        }
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }


}
