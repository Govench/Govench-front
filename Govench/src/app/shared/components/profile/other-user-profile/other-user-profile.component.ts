import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../models/user/user-profile-model';
import { UserProfileService } from '../../../../core/services/user/user.profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../../../../core/services/rating/rating.service';
import { RatingResponse } from '../../../models/rating/rating-response.model';

@Component({
  selector: 'app-other-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  userId!: number; // El valor de userId será recibido desde la URL
  profile: UserProfile = {} as UserProfile;
  profileImageUrl: SafeUrl;
  ratings: RatingResponse[];
  // Variable para perfil del usuario mismo
  profile1!: UserProfile;
  profileImageUrl1: SafeUrl;
  isFollowing: boolean = false;
  
  private userProfileService = inject(UserProfileService);
  private snackbar = inject(MatSnackBar);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);  // Inyectamos ActivatedRoute para acceder a los parámetros de la ruta
  private ratingService = inject(RatingService);

  ngOnInit(): void {
    // Obtenemos el userId desde los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; // Extraemos el parámetro 'id' de la URL y lo convertimos a número
      this.loadOtherUserProfile();  // Llamamos a la función para cargar el perfil
    });

    this.loadRatingsUser();
  }

  loadOtherUserProfile(): void {
    // Usamos userId para hacer la consulta del perfil
    this.userProfileService.getUserProfile(this.userId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.showSnackBar('Perfil cargado con éxito.');
      },
      error: (error) => {
        this.showSnackBar('Error al cargar el perfil');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  loadRatingsUser(){
    this.ratingService.getRatingsByUserId(this.userId).subscribe({
      next: (ratings) => {
        this.ratings = ratings;
      },
      error: (error) => {
        console.log(error);
      }
    })
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

  followUser(){
    this.userProfileService.followUser(this.userId).subscribe({
      next: () => {
        this.showSnackBar('Usuario seguido con exito.');
      },
      error: (error) => {
        this.showSnackBar('Error al seguir al usuario');
      }
    });
    this.isFollowing = true;
  }

  unfollowUser(){
    this.userProfileService.unfollowUser(this.userId).subscribe({
      next: () => {
        this.showSnackBar('A dejado de seguir al usuario con exito.');
      },
      error: (error) => {
        this.showSnackBar('Error al dejar de seguir al usuario');
      }
    });
    this.isFollowing = false;
  }
  
}
