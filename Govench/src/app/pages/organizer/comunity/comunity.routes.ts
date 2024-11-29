import { Routes } from '@angular/router';
import { ComunityPertainComponent } from '../../../shared/components/comunity-pertain/comunity-pertain.component';
import { ComunityAvailableComponent } from '../../../shared/components/comunity-available/comunity-available.component';
import { ComunityCreatedComponent } from '../../../shared/components/comunity-created/comunity-created.component';
import { ComunityDetailComponent } from '../../../shared/components/comunity-detail/comunity-detail.component';
import { ComunityManageComponent } from '../../../shared/components/comunity-manage/comunity-manage.component';

export const comunityRoutes: Routes = [

    { path: 'perteneces', component: ComunityPertainComponent },
    { path: 'perteneces/comunidad/:id', component: ComunityDetailComponent },
    { path: 'disponibles', component: ComunityAvailableComponent },
    { path: 'creados', component: ComunityCreatedComponent },
    { path: 'creados/manage/:id', component: ComunityManageComponent },
    { path: 'disponibles/comunidad/:id', component: ComunityDetailComponent },
    { path: '', redirectTo: 'perteneces', pathMatch: 'full' }

];
