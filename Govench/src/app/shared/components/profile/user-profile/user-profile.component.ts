import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user/user-profile-model';
import { UserProfileService } from '../../../../core/services/user/user.profile.service';
import { AuthServiceService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  profileImageUrl: SafeUrl;
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private sanitizer=inject(DomSanitizer);

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
          console.log(objectURL)
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
      this.router.navigate(['/organizer/profile/update'])
    }
    else
    {
      this.router.navigate(['/participant/profile/update'])
    }

  }


  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
