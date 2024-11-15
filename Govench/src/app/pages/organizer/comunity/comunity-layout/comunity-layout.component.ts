import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comunity-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './comunity-layout.component.html',
  styleUrl: './comunity-layout.component.scss'
})
export class ComunityLayoutComponent {

}
