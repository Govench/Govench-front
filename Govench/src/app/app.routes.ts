import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { authInverseGuard } from './core/guards/auth/auth-inverse.guard';
import { HomeComponent } from './pages/home/home.component';
import { PasswordRecoveryComponent } from './pages/password/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './pages/password/new-password/new-password.component';

export const routes: Routes = [
    { path: 'password-recovery', component: PasswordRecoveryComponent },
    { path: 'new-password', component: NewPasswordComponent },
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
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a 'inicio'
    { path: '**', redirectTo: '/inicio' } // Redirige cualquier ruta no encontrada a 'inicio'
];