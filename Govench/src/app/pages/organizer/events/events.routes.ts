import { Routes } from '@angular/router';
import { EventsRegisterComponent } from '../../../shared/components/events-register/events-register.component';
import { EventsLastComponent } from '../../../shared/components/events-last/events-last.component';
import { EventsCreateComponent } from '../../../shared/components/events-create/events-create.component';
import { CrearEventoComponent } from '../crear-evento/crear-evento.component';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';

export const eventosRoutes: Routes = [
          { path: 'registrados', component: EventsRegisterComponent },
          { path: 'creados', component: EventsCreateComponent },
          { path: 'pasados', component: EventsLastComponent },
          { path: 'creados/crear', component: CrearEventoComponent},
          { path: 'creados/editar', component: EditarEventoComponent},
          { path: '', redirectTo: 'registrados', pathMatch: 'full' }
];