import { Routes } from '@angular/router';
import { EventsRegisterComponent } from '../../../shared/components/events-register/events-register.component';
import { EventsLastComponent } from '../../../shared/components/events-last/events-last.component';
import { EventsCreateComponent } from '../../../shared/components/events-create/events-create.component';

export const eventosRoutes: Routes = [
          { path: 'registrados', component: EventsRegisterComponent },
          { path: 'pasados', component: EventsLastComponent },
          { path: '', redirectTo: 'registrados', pathMatch: 'full' }
];