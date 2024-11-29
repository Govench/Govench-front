import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { UserComunity } from '../../models/comunity/UserComunity-response.model';

@Component({
  selector: 'app-comunity-pertain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-pertain.component.html',
  styleUrl: './comunity-pertain.component.scss'
})
export class ComunityPertainComponent {

  comunitiesByUser: UserComunity[];

  private communityService = inject(ComunityService)
  private router = inject(Router);
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getCommunitiesPertainByUser();
  }

  getCommunitiesPertainByUser() {
    this.isLoading=true;
    this.communityService.getComunitiesPertainByUser().subscribe({
      next: (communitiesByUser) => {
        this.isLoading=false;
        this.comunitiesByUser = communitiesByUser;
      },
      error: (error) => {
        this.isLoading=false;
        console.error('Error fetching communities by user:', error);
      }
    });
  }

  navigateToDetail(communityId: number) {
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/comunidades' : '/participant/comunidades';
    
    this.router.navigate([`${baseUrl}/perteneces/comunidad`, communityId]);
  }

  navigateComunties()
  {
    this.router.navigate(["/organizer/comunidades/disponibles"])
  }
}
