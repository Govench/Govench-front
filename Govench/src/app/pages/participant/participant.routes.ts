import { Routes } from '@angular/router';
import { ParticipantLayoutComponent } from './participant-layout/participant-layout.component';
import { EvetnspLayoutComponent } from './events/evetnsp-layout/evetnsp-layout.component';
import { eventosRoutes } from '../participant/events/eventsp.routes';
import { FollowpLayoutComponent } from '../participant/followp/followp-layout/followp-layout.component';
import { followpRoutes } from '../participant/followp/followp.routes';

export const participantRoutes: Routes = [
    {
        path : "",
        component :ParticipantLayoutComponent,
        children: [
            {
                path: "cuenta",
                component: FollowpLayoutComponent,
                children: followpRoutes
            },
            {
                path: 'eventos',
                component:EvetnspLayoutComponent,
                children: eventosRoutes
            }
        ]
    }
];