import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ManageEventsComponent } from './manage-events/manage-events.component';

export const routes: Routes = [

    { path: 'events/crear', component: ManageEventsComponent},

];

/* @NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    
}  */
