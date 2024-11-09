import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/profile/update-profile/update-profile.component';
import { OrganizerLayoutComponent } from './organizer-layout/organizer-layout.component';
import { EventsRegisterComponent } from '../../shared/components/events-register/events-register.component';
import { eventosRoutes } from './events/events.routes';
import { EventsLayoutComponent } from './events/events-layout/events-layout.component';
export const participantRoutes: Routes = [
    {
        path : "",
        component :OrganizerLayoutComponent,
        children: [
            {path: "profile" , component :UserProfileComponent},
            {path: "profile/update" , component :UpdateProfileComponent},
            {
                path: 'profile/eventos',
                component:EventsLayoutComponent,
                children: eventosRoutes
            }
        ]
    }
];