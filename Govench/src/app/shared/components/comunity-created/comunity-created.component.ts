import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';

@Component({
  selector: 'app-comunity-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-created.component.html',
  styleUrls: ['./comunity-created.component.scss']
})
export class ComunityCreatedComponent implements OnInit {
  comunities: ComunityResponse[] = [];
  baseRoute: string;

  constructor(
    private comunityService: ComunityService,
    private router: Router,
    private authService: AuthServiceService // Inyecta AuthService
  ) {}

  ngOnInit() {
    this.setBaseRoute();
    this.getMyComunities();
  }

  setBaseRoute() {
    const user = this.authService.getUser();
    if (user?.role === 'ROLE_ORGANIZER') {
      this.baseRoute = '/organizer';
    } else {
      this.baseRoute = '/participant';
    }
  
  }

  getMyComunities() {
    this.comunityService.getCommunitiesByUser().subscribe((comunities) => {
  
      this.comunities = comunities;
    });
  }

  goDetail(id: number) {
    if (!this.baseRoute) {
      this.setBaseRoute();
    }
    const url = `${this.baseRoute}/comunidades/creados/manage/${id}`;
    this.router.navigate([url]);
  }
}