import { Routes } from '@angular/router';
import { ParticipantLayoutComponent } from './participant-layout/participant-layout.component';
import { UserProfileComponent } from '../../shared/components/profile/user-profile/user-profile.component';
export const participantRoutes: Routes = [
    {
        path : "",
        component :ParticipantLayoutComponent,
        children: [
            {path: "profile" , component :UserProfileComponent}
        ]
    }
];