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

@Component({
  selector: 'app-other-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {
  userId!: number; 
  profile: UserProfile = {} as UserProfile;
  profileImageUrl: SafeUrl;
  ratings: RatingResponse[];
  profile1!: UserProfile;
  profileImageUrl1: SafeUrl;
  isFollowing: boolean = false;
  
  private userProfileService = inject(UserProfileService);
  private snackbar = inject(MatSnackBar);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);  // Inyectamos ActivatedRoute para acceder a los parámetros de la ruta
  private ratingService = inject(RatingService);
  private followStorage = inject(FollowStorage);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!; 
      this.loadOtherUserProfile();
    });

    this.loadRatingsUser();
  }

  loadOtherUserProfile(): void {
    this.userProfileService.getUserProfile(this.userId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.checkFollowingStatus();
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
        this.showSnackBar(error.error);
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
  
}
