import { Routes } from '@angular/router';  
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordConfirmationComponent } from './password-confirmation/password-confirmation.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AuthLayoutComponent } from '../auth/auth-layout/auth-layout.component';

export const passwordRoutes: Routes = [
    {
        path : "", 
        component :AuthLayoutComponent,
        children: [
            {
                path: "new",
                component: NewPasswordComponent, 
            },
            {
                path: 'confirmation',
                component:PasswordConfirmationComponent, 
            },
            {
                path: 'recovery',
                component: PasswordRecoveryComponent, 
            }
        ]
    }
];