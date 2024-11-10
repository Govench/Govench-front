import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../../shared/components/profile/update-profile/update-profile.component';
import { SeguidoresComponent } from '../../../shared/components/seguidores/seguidores.component';
import { SeguidosComponent } from '../../../shared/components/seguidos/seguidos.component';

export const followRoutes: Routes = [

    {path: "profile" , component :UserProfileComponent},
    {path: "profile/update" , component :UpdateProfileComponent},
    {path: "seguidores" , component : SeguidoresComponent},
    {path: "seguidos" , component : SeguidosComponent},
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
    
];