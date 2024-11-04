
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { authInverseGuard } from './core/guards/auth/auth-inverse.guard';

export const routes: Routes = [
   
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
    { path: '**', redirectTo: '/participant' } //provisorio hasta crear una pagina de notfount
    
];

