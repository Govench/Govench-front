import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component';
import { ComunidadesComponent } from './comunidades/comunidades.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EventosComponent,ComunidadesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Govench';
}
