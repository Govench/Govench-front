import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../../shared/components/profile/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../../shared/components/profile/update-profile/update-profile.component';
import { SeguidoresComponent } from '../../../shared/components/seguidores/seguidores.component';
import { SeguidosComponent } from '../../../shared/components/seguidos/seguidos.component';
import { OtherUserProfileComponent } from '../../../shared/components/profile/other-user-profile/other-user-profile.component';
import { SearchUsersComponent } from '../../../shared/components/search-users/search-users.component';

export const followpRoutes: Routes = [

    {path: "profile", component: UserProfileComponent},
    {path: "profile/update", component: UpdateProfileComponent},
    {path: "seguidores", component: SeguidoresComponent},
    {path: "seguidos", component: SeguidosComponent},
    {path: "search", component: SearchUsersComponent},
    {path: "search/user/:id", component: OtherUserProfileComponent}, // Esta debe ir después de "search"
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
  ];