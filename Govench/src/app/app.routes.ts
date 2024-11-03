
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { BodyComponent } from './body/body.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { authInverseGuard } from './core/guards/auth/auth-inverse.guard';

export const routes: Routes = [
   
    { path: 'auth', 
        loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes),
        canActivate:[authInverseGuard]

    },
    
    { path: 'participant', 
        loadChildren : () => import ("././pages/participant/participant.routes").then(a => a.participantRoutes),
        canActivate:[authGuard]
    },
    { path: '**', redirectTo: 'auth/login', pathMatch: 'full' } // Poner esta al final
];

