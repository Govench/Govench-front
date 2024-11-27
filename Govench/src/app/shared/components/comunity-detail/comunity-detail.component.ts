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
        if (this.router.url.includes('/mi-cuenta')){
          this.router.navigate(['/participant/comunidades/mi-cuenta']);
        }
      }
    }
  }
}
