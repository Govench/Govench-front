
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { BodyComponent } from './body/body.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth', loadChildren : () => import ("././pages/auth/auth.routes").then(a => a.authRoutes)},
    { path: 'landing',component: BodyComponent}
];

