import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';
import { ComunityResquest } from '../../../shared/models/comunity/comunity-request.model';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-comunity-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunity-manage.component.html',
  styleUrls: ['./comunity-manage.component.scss']
})
export class ComunityManageComponent implements OnInit {
  communityId: number;
  community: ComunityResponse = { id: 0, name: '', descripcion: '', owner: { id: 0, name: '', email: '', profileDesc: '' }, tags: [], post: [] }; // Inicializa con valores por defecto
  communityRequest: ComunityResquest = { name: '', descripcion: '' }; // Inicializa con valores por defecto
  baseRoute: string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private comunityService: ComunityService,
    private authService: AuthServiceService // Inyecta AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = +params['id'];
      this.setBaseRoute();
      this.loadCommunity();
    });
  }

  setBaseRoute() {
    const user = this.authService.getUser();
    if (user?.role === 'ROLE_ORGANIZER') {
      this.baseRoute = '/organizer';
    } else {
      this.baseRoute = '/participant';
    }
  }

  loadCommunity() {
    this.comunityService.getCommunityById(this.communityId).subscribe(
      (data: ComunityResponse) => {
        this.community = data;
        this.communityRequest.name = data.name;
        this.communityRequest.descripcion = data.descripcion;
      },
      (error) => {
        console.error('Error fetching community', error);
      }
    );
  }

  updateCommunity() {
    // Validar si los campos están vacíos y mantener los valores originales si es así
    if (!this.communityRequest.name) {
      this.communityRequest.name = this.community.name;
    }
    if (!this.communityRequest.descripcion) {
      this.communityRequest.descripcion = this.community.descripcion;
    }

    this.comunityService.updateCommunity(this.communityId, this.communityRequest).subscribe(
      (data: ComunityResponse) => {

        this.router.navigate([`${this.baseRoute}/comunidades/creados`]);
      },
      (error) => {
        console.error('Error updating community', error);
      }
    );
  }

  deleteCommunity() {
    this.comunityService.deleteCommunity(this.communityId).subscribe(
      (response) => {
       
        this.router.navigate([`${this.baseRoute}/comunidades/creados`]);
      },
      (error) => {
        console.error('Error deleting community', error);
      }
    );
  }

  cancel() {
    this.router.navigate([`${this.baseRoute}/comunidades/creados`]);
  }
}