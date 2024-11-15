import { Routes } from '@angular/router';
import { ComunityPertainComponent } from '../../../shared/components/comunity-pertain/comunity-pertain.component';
import { ComunityAvailableComponent } from '../../../shared/components/comunity-available/comunity-available.component';
import { ComunityCreatedComponent } from '../../../shared/components/comunity-created/comunity-created.component';
import { ComunityDetailComponent } from '../../../shared/components/comunity-detail/comunity-detail.component';

export const comunitypRoutes: Routes = [

    { path: 'perteneces', component: ComunityPertainComponent },
    { path: 'disponibles', component: ComunityAvailableComponent },
    { path: 'creados', component: ComunityCreatedComponent },
    { path: 'disponibles/comunidad/:id', component: ComunityDetailComponent },
    { path: '', redirectTo: 'perteneces', pathMatch: 'full' }

];
