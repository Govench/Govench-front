import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityResponse } from '../../models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';

@Component({
  selector: 'app-comunity-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-detail.component.html',
  styleUrl: './comunity-detail.component.scss'
})
export class ComunityDetailComponent {

  comunitieDetail: ComunityResponse;

  private communityService = inject(ComunityService)
  private router = inject(Router);

  ngOnInit(): void {
    this.detailEvent();
  }

  detailEvent(){
    const communityId = parseInt(this.router.url.split('/')[5])
    console.log('Comunidad a detallar:', communityId);
    this.communityService.getCommunityById(communityId).subscribe(
      (comunitieDetail) => {
        this.comunitieDetail = comunitieDetail;
        console.log('Detalle de la Comunidad:', this.comunitieDetail);
      }
    )
  }

  volverComunidades() {
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/comunidades' : '/participant/comunidades';
    this.router.navigate([`${baseUrl}/disponibles`]);
  }
}
