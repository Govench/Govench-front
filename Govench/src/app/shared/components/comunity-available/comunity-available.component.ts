import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityResponse } from '../../models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';

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

  ngOnInit(): void {
    this.getCommunitiesAvailable()
  }

  getCommunitiesAvailable() {
    this.communityService.getAllCommunities().subscribe(
      (comunitiesAvailable) => {
        this.comunitiesAvailable = comunitiesAvailable;
        console.log('Comunidades disponibles:', this.comunitiesAvailable);
      }
    )
  }

  navigateToDetail(communityId: number) {
    console.log('Navigating to community:', communityId);
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/comunidades' : '/participant/comunidades';
    
    this.router.navigate([`${baseUrl}/disponibles/comunidad`, communityId]);
  }
  
}
