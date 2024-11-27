import { Routes } from '@angular/router';
import { OrganizerLayoutComponent } from './organizer-layout/organizer-layout.component';
import { EventsLayoutComponent } from './events/events-layout/events-layout.component';
import { eventosRoutes } from './events/events.routes';
import { FollowLayoutComponent } from './follow/follow-layout/follow-layout.component';
import { followRoutes } from './follow/follow.routes';
import { ComunityLayoutComponent } from './comunity/comunity-layout/comunity-layout.component';
import { comunityRoutes } from './comunity/comunity.routes';
import { HomeComponent } from '../Event-home/home.component';

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
            },
            {
                path: 'comunidades',
                component: ComunityLayoutComponent,
                children: comunityRoutes
            }
        ]
    }
];