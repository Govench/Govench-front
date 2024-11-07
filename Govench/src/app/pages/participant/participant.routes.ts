import { Routes } from '@angular/router';
import { ParticipantLayoutComponent } from './participant-layout/participant-layout.component';
import { UserProfileComponent } from '../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/profile/update-profile/update-profile.component';
export const participantRoutes: Routes = [
    {
        path : "",
        component :ParticipantLayoutComponent,
        children: [
            {path: "profile" , component :UserProfileComponent},
            {path: "profile/update" , component :UpdateProfileComponent}
        ]
    }
];