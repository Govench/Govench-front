import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-follow-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './follow-layout.component.html',
  styleUrl: './follow-layout.component.scss'
})
export class FollowLayoutComponent {

}
