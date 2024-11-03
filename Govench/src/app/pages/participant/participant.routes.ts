import { Routes } from '@angular/router';
import { ParticipantLayoutComponent } from './participant-layout/participant-layout.component';

export const participantRoutes: Routes = [
    {
        path : "",
        component :ParticipantLayoutComponent,
        children: [

        ]
    }
];