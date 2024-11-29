import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user/user-profile-model';
import { UserProfileService } from '../../../../core/services/user/user.profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../../../../core/services/rating/rating.service';
import { RatingResponse } from '../../../models/rating/rating-response.model';
import { FollowStorage } from '../../../../core/services/follow/follow-storage.service';
import { RatingRequest } from '../../../models/rating/rating-request.model';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthServiceService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-other-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  userId!: number; 
  myId: number | null;
  profile: UserProfile = {} as UserProfile;
  perfilcalificador :UserProfile
  profileImageUrl: SafeUrl;
  ratings: RatingResponse[];
  profile1!: UserProfile;
  profileImageUrl1: SafeUrl;
  isFollowing: boolean = false;
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthServiceService);
  private snackbar = inject(MatSnackBar);
  private sanitizer=inject(DomSanitizer);
  private route = inject(ActivatedRoute); 
  private ratingService = inject(RatingService);
  private followStorage = inject(FollowStorage);
  existRating :boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; 
      this.loadOtherUserProfile();
    });

    this.loadRatingsUser();
    this.ratingService.existRating(this.userId).subscribe({
      next: (res) =>
      {
        this.existRating=res;
        console.log(this.existRating)
      },
      error: (error) =>
        {

          this.showSnackBar(error.error);
        }
      
    });

    this.loadMyPhoto(this.authService.getCurrentUserId());
  }

  loadOtherUserProfile(): void {
    this.userProfileService.getUserProfile(this.userId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.checkFollowingStatus();
        this.loadUserPhoto(this.userId);
      },
      error: (error) => {
        this.showSnackBar('Error al cargar el perfil');
      }
    });
  }
loadUserPhoto(userId :number)
{
  this.userProfileService.getProfileImage(userId).subscribe({
    next: (blob: Blob) => {
      const objectURL = URL.createObjectURL(blob);
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    },
    error: (error) => {
      console.error('Error al cargar la imagen de perfil:', error);
    }
  }); 
}
loadMyPhoto(myId :number | null)
{ 
  if(myId!=null)
  {
    this.userProfileService.getProfileImage(myId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl1 = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.error('Error al cargar la imagen de perfil:', error);
      }
    }); 
  }
  else
  {
    this.showSnackBar("Error al cargar tu foto de perfil");
  }

}
  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  loadRatingsUser(): void {
    this.ratingService.getRatingsByUserId(this.userId).subscribe({
      next: (ratings) => {
        // Inicializa el arreglo de calificaciones con usuarios y fotos.
        this.ratings = ratings;
  
        // Itera sobre las calificaciones para obtener el perfil e imagen del calificador.
        this.ratings.forEach((rating) => {
          this.userProfileService.getUserProfile(rating.idUserCalificador).subscribe({
            next: (userProfile) => {
              // Asigna el perfil del calificador a la calificación.
              rating.userCalificadorProfile  = userProfile;
  
              // Carga la foto del calificador.
              this.getUserPhoto(rating.idUserCalificador, rating.userCalificadorProfile);
            },
            error: (error) => {
              console.error(`Error al obtener el perfil del usuario con ID ${rating.idUserCalificador}:`, error);
            }
          });
        });
      },
      error: (error) => {
        this.showSnackBar(error.error);
      }
    });
  }

  getUserPhoto(userId: number, user: UserProfile): void {
    this.userProfileService.getProfileImage(userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        user.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL) as string;
      },
      error: (error) => {
        console.error(`Error al cargar la imagen de perfil del usuario con ID ${userId}:`, error);
        user.profileImageUrl = 'https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png'; // Imagen por defecto
      }
    });
  }

  // Funcion para crear comentaroi
  newRating = 0;
  hoverRating = 0;

  rate(value: number) {
    this.newRating = value;
  }

  setHoverRating(value: number) {
    this.hoverRating = value;
  }

  checkFollowingStatus(): void {
    this.isFollowing = this.followStorage.isFollowing(this.userId);
  }

  followUser(){
    this.userProfileService.followUser(this.userId).subscribe({
      next: () => {
        this.followStorage.addFollowingUser(this.userId);
        this.isFollowing = true;
        this.loadOtherUserProfile();
        this.showSnackBar('Usuario seguido con exito.');

      },
      error: (error) => {
        this.showSnackBar('Error al seguir al usuario');
      }
    });
  }

  unfollowUser(){
    this.userProfileService.unfollowUser(this.userId).subscribe({
      next: () => {
        this.followStorage.removeFollowingUser(this.userId);
        this.isFollowing = false;
        this.loadOtherUserProfile();
        this.showSnackBar('A dejado de seguir al usuario con exito.');
      },
      error: (error) => {
        this.showSnackBar('Error al dejar de seguir al usuario');
      }
    });
  }
  private data : RatingRequest;

  submitRating(form: NgForm): void {
    if (form.valid) {
      const ratingRequest: RatingRequest = {
        ratingValue: this.newRating,
        comment: form.value.comment
      };

      this.ratingService.rateUser(this.userId, ratingRequest).subscribe({
        next: () => {
          this.showSnackBar('¡Calificación enviada con éxito!');
          this.newRating = 0;
          form.reset(); // Resetea el formulario
          this.loadRatingsUser()
        },
        error: (err) => {
          this.showSnackBar(err.error);
        }
      });
    }
  }
  
}
