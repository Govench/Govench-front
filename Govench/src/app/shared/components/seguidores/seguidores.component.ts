import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../core/services/follow/follow.service';
import { Follow } from '../../../shared/models/follow/follow.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seguidores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seguidores.component.html',
  styleUrl: './seguidores.component.scss'
})
export class SeguidoresComponent {

  followers: Follow[];
  private followService= inject(FollowService);

  ngOnInit(): void {
    this.myFollowers();
  }

  myFollowers() {
    this.followService.getFollowersDetails().subscribe(
      (follow) => {
        this.followers = follow;
        console.log('Seguidores:', this.followers);
      }
    );
  }

}
