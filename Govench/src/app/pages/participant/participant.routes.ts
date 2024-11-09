import { Routes } from '@angular/router';
import { ParticipantLayoutComponent } from './participant-layout/participant-layout.component';
import { UserProfileComponent } from '../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/profile/update-profile/update-profile.component';
import { EvetnspLayoutComponent } from './events/evetnsp-layout/evetnsp-layout.component';
import { eventosRoutes } from '../participant/events/eventsp.routes';

export const participantRoutes: Routes = [
    {
        path : "",
        component :ParticipantLayoutComponent,
        children: [
            {path: "profile" , component :UserProfileComponent},
            {path: "profile/update" , component :UpdateProfileComponent},
            {
                path: 'profile/eventos',
                component:EvetnspLayoutComponent,
                children: eventosRoutes
            }
        ]
    }
];