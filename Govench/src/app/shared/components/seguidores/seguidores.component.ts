import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../core/services/follow/follow.service';
import { Follow } from '../../../shared/models/follow/follow.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-seguidores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguidores.component.html',
  styleUrl: './seguidores.component.scss'
})
export class SeguidoresComponent {

  followers: Follow[];
  private router = inject(Router);
  private followService= inject(FollowService);

  ngOnInit(): void {
    this.myFollowers();
  }

  myFollowers() {
    this.followService.getFollowersDetails().subscribe(
      (follow) => {
        this.followers = follow;
      }
    );
  }

  navigateToDetailUser(userId: number) {
    // Verifica si la ruta contiene '/organizer' o '/participant' para determinar a qué tipo de usuario pertenecemos
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/cuenta' : '/participant/cuenta';
 
    this.router.navigate([`${baseUrl}/search/user`, userId]);
  }

}
