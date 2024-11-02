import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EventosComponent } from './eventos/eventos.component'// Asegúrate de que la ruta sea correcta
import { ComunidadesComponent } from './comunidades/comunidades.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'eventos', component: EventosComponent },
  { path: 'comunidades', component: ComunidadesComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // Puedes agregar otras rutas aquí
];