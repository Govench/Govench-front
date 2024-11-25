import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { ComunityResponse } from '../../../shared/models/comunity/comunity-response.model';
import { ComunityResquest } from '../../../shared/models/comunity/comunity-request.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunity-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunity-manage.component.html',
  styleUrls: ['./comunity-manage.component.scss']
})
export class ComunityManageComponent implements OnInit {
  communityId: number;
  community: ComunityResponse = { id: 0, name: '', descripcion: '', owner: { id: 0, name: '',email:'',profileDesc:'' }, tags: [], post: [] }; // Inicializa con valores por defecto
  communityRequest: ComunityResquest = { name: '', descripcion: '' }; // Inicializa con valores por defecto

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private comunityService: ComunityService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = +params['id'];
      this.loadCommunity();
    });
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
    this.comunityService.updateCommunity(this.communityId, this.communityRequest).subscribe(
      (data: ComunityResponse) => {
        console.log('Community updated', data);
        this.router.navigate(['/organizer/comunidades/creados']);
      },
      (error) => {
        console.error('Error updating community', error);
      }
    );
  }

  deleteCommunity() {
    this.comunityService.deleteCommunity(this.communityId).subscribe(
      (response) => {
        console.log('Community deleted', response);
        this.router.navigate(['/organizer/comunidades/creados']);
      },
      (error) => {
        this.router.navigate(['/organizer/comunidades/creados']);
        console.error('Error deleting community', error);
      }
    );
  }
}