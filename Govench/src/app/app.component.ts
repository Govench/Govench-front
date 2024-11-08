import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from "./pages/auth/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Govench';
}
