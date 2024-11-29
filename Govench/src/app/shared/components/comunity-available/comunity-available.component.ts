import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityResponse } from '../../models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { CommunityStateService } from '../../../core/services/comunity/comunity-state.service';

@Component({
  selector: 'app-comunity-available',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-available.component.html',
  styleUrl: './comunity-available.component.scss'
})
export class ComunityAvailableComponent {

  comunitiesAvailable: ComunityResponse[];

  private communityService = inject(ComunityService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthServiceService);
  private communityStateService = inject(CommunityStateService);
  isloading:boolean;
  ngOnInit(): void {
    this.getCommunitiesAvailable();
  }

  getCommunitiesAvailable() {
    this.isloading = true;
    this.communityService.getAllCommunities().subscribe({
      next: (comunitiesAvailable) => {
        this.isloading = false;
  
        // Añadir el estado de unión a cada comunidad
        this.comunitiesAvailable = comunitiesAvailable.map((community) => ({
          ...community,
          joined: this.communityStateService.isJoined(community.id),
        }));
      },
      error: (error) => {
        this.isloading = false;
        this.showSnackBar(error.error);
      },
    });
  }
  
  navigateToDetail(communityId: number) {
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/comunidades' : '/participant/comunidades';
    
    this.router.navigate([`${baseUrl}/disponibles/comunidad`, communityId]);
  }

  isJoined(communityId: number): boolean {
    return this.communityStateService.isJoined(communityId);
  }
  
  joinCommunity(idCommunity: number) {
    this.communityService.joinCommunity(idCommunity).subscribe({
      next: (response) => {
        this.communityStateService.setJoinedState(idCommunity, true);
        this.showSnackBar(response);
      },
      error: (error) => {
        this.showSnackBar(error.error);
      }
    });
    
  }

  leaveCommunity(communityId: number) {
    const userId = this.authService.getCurrentUserId();
    if(userId){
      this.communityService.leaveCommunity(userId, communityId).subscribe({
        next: (response) => {
          this.communityStateService.setJoinedState(communityId, false);
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
