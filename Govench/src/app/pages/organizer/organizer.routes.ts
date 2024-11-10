import { Routes } from '@angular/router';
import { OrganizerLayoutComponent } from './organizer-layout/organizer-layout.component';
import { eventosRoutes } from './events/events.routes';
import { EventsLayoutComponent } from './events/events-layout/events-layout.component';
import { FollowLayoutComponent } from './follow/follow-layout/follow-layout.component';
import { followRoutes } from './follow/follow.routes';

export const participantRoutes: Routes = [
    {
        path : "",
        component :OrganizerLayoutComponent,
        children: [
            {
                path: "cuenta",
                component: FollowLayoutComponent,
                children: followRoutes
            },
            {
                path: 'eventos',
                component:EventsLayoutComponent,
                children: eventosRoutes
            }
        ]
    }
];