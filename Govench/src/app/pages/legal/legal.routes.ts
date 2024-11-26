import { Routes } from '@angular/router';  
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPoliticsComponent } from './privacy-politics/privacy-politics.component';

export const legalRoutes: Routes = [
    { path : 'privacy', component: PrivacyPoliticsComponent },
    { path : 'terms', component: TermsConditionsComponent }
];