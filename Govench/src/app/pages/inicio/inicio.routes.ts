import { Routes } from '@angular/router';
import { HomeComponent } from './inicio-layout/home.component';
import { BodyComponent } from './body/body.component';

export const inicioRoutes: Routes = [

    {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: BodyComponent }
        ]
    }
];
