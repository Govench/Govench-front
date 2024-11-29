import { Routes } from '@angular/router';  
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordConfirmationComponent } from './password-confirmation/password-confirmation.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AuthLayoutComponent } from '../auth/auth-layout/auth-layout.component';
import { AdviceComponent } from './advice/advice.component';
import { ValidateTokenComponent } from './validate-token/validate-token.component';

export const passwordRoutes: Routes = [
    {
        path : "", 
        component :AuthLayoutComponent,
        children: [
            {
                path: "new/:token",
                component: NewPasswordComponent, 
            },
            {
                path: "advice",
                component: AdviceComponent, 
            },
            {
                path: 'confirmation',
                component:PasswordConfirmationComponent, 
            },
            {
                path: 'validate/:token',
                component:ValidateTokenComponent, 
            },
            {
                path: 'recovery',
                component: PasswordRecoveryComponent, 
            }
        ]
    }
];