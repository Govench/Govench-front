import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../core/services/follow/follow.service';
import { Follow } from '../../../shared/models/follow/follow.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seguidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seguidos.component.html',
  styleUrl: './seguidos.component.scss'
})
export class SeguidosComponent {
  Followings: Follow[];
  private followService= inject(FollowService);

  ngOnInit():void {
    this.myFollowings();
  }
  
  myFollowings() {
    this.followService.getFollowingDetails().subscribe(
      (follow) => {
        this.Followings = follow;
        console.log('Seguidos: ', this.Followings);
      });
  }

}
