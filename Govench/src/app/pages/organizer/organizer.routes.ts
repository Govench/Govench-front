import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/profile/update-profile/update-profile.component';
import { OrganizerLayoutComponent } from './organizer-layout/organizer-layout.component';
export const participantRoutes: Routes = [
    {
        path : "",
        component :OrganizerLayoutComponent,
        children: [
            {path: "profile" , component :UserProfileComponent},
            {path: "profile/update" , component :UpdateProfileComponent}
        ]
    }
];