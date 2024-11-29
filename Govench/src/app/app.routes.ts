import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { authInverseGuard } from './core/guards/auth/auth-inverse.guard';
import { HomeComponent } from './pages/Event-home/home.component';
import { PasswordRecoveryComponent } from './pages/password/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './pages/password/new-password/new-password.component';
import { DetailsEventComponent } from './shared/components/details-event/details-event.component';
import { PayCancelledComponent } from './shared/components/Payment-pages/pay-cancelled/pay-cancelled.component';
import { PayConfirmationComponent } from './shared/components/Payment-pages/pay-confirmation/pay-confirmation.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'password', 
        loadChildren : () => import ("././pages/password/password.routes").then(r => r.passwordRoutes)
     }, 
    { path: 'auth', 
        loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes),
        canActivate:[authInverseGuard]

    },
    { path: 'participant', 
        loadChildren : () => import ("././pages/participant/participant.routes").then(p => p.participantRoutes),
        canActivate:[authGuard]
    },
    { path: 'organizer', 
        loadChildren : () => import ("././pages/organizer/organizer.routes").then(o => o.participantRoutes),
        canActivate:[authGuard]
    },
    // { path: '**', redirectTo: '/participant' }, //provisorio hasta crear una pagina de notfount
    {
        path: 'inicio',
        loadChildren : () => import ("./pages/inicio/inicio.routes").then(i => i.inicioRoutes)
    },
    {path:'eventos', component:HomeComponent},
    {path:'pago/cancelado',component:PayCancelledComponent,canActivate:[authGuard]},
    {path:'pago/confirmado',component:PayConfirmationComponent,canActivate:[authGuard]},
    {path:'eventos/:id', component:DetailsEventComponent},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a 'inicio'
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '/404' } // Redirige cualquier ruta no encontrada a 'inicio'

];