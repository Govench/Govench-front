import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityResponse } from '../../models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { CommunityStateService } from '../../../core/services/comunity/comunity-state.service';

@Component({
  selector: 'app-comunity-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-detail.component.html',
  styleUrl: './comunity-detail.component.scss'
})
export class ComunityDetailComponent {

  comunitieDetail: ComunityResponse;
  isJoined: boolean = false;

  private communityService = inject(ComunityService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthServiceService);
  private communityStateService = inject(CommunityStateService);

  ngOnInit(): void {
    this.detailEvent();
  }

  detailEvent(){
    const communityId = parseInt(this.router.url.split('/')[5])
    this.communityService.getCommunityById(communityId).subscribe(
      (comunitieDetail) => {
        this.comunitieDetail = comunitieDetail;
        this.isJoined = this.communityStateService.isJoined(communityId);
      }
    )
  }

  volverComunidades() {
    const isOrganizer = this.router.url.includes('/organizer');
    if (isOrganizer) {
      if (this.router.url.includes('/disponibles')){
        this.router.navigate(['/organizer/comunidades/disponibles']);
      } else {
        if (this.router.url.includes('/perteneces')){
          this.router.navigate(['/organizer/comunidades/perteneces']);
        }
      }
    }else{
      if (this.router.url.includes('/disponibles')){
        this.router.navigate(['/participant/comunidades/disponibles']);
      } else {
        if (this.router.url.includes('/perteneces')){
          this.router.navigate(['/participant/comunidades/perteneces']);
        }
      }
    }
  }

  joinCommunity() {
    if (!this.comunitieDetail) return;
    
    this.communityService.joinCommunity(this.comunitieDetail.id).subscribe({
      next: (response) => {
        this.isJoined = true;
        this.communityStateService.setJoinedState(this.comunitieDetail.id, true);
        this.showSnackBar(response);
      },
      error: (error) => {
        this.showSnackBar(error.error);
      }
    });
  }

  leaveCommunity() {
    if (!this.comunitieDetail) return;

    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.communityService.leaveCommunity(userId, this.comunitieDetail.id).subscribe({
        next: (response) => {
          this.isJoined = false;
          this.communityStateService.setJoinedState(this.comunitieDetail.id, false);
          this.showSnackBar(response);
        },
        error: (error) => {
          this.showSnackBar(error.error);
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
