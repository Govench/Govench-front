
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { BodyComponent } from './body/body.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

export const routes: Routes = [
   
    { path: 'auth', loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes)},
    { path: 'password-recovery', component: PasswordRecoveryComponent },
    { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
    
];

