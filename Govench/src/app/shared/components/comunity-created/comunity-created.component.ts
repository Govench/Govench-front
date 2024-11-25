import { Component } from '@angular/core';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunity-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-created.component.html',
  styleUrl: './comunity-created.component.scss'
})
export class ComunityCreatedComponent {
  comunities: ComunityResponse[] = [];

  constructor(private comunityService: ComunityService, private router: Router) {}

  ngOnInit() {
    console.log('Obteniendo comunidades creadas por el usuario');
    this.getMyComunities();
  }

  getMyComunities() {
    this.comunityService.getCommunitiesByUser().subscribe((comunities) => {
      console.log('Comunidades obtenidas', comunities);
      this.comunities = comunities;
    });
  }

  goDetail(id: number) {
    const url = `/organizer/comunidades/creados/manage/${id}`;
    this.router.navigate([url]);
    console.log(`Navigating to: ${url}`);
  }
}
