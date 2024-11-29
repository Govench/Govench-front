import { Routes } from '@angular/router';
import { HomeComponent } from './inicio-layout/home.component';
import { BodyComponent } from './body/body.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPoliticsComponent } from './privacy-politics/privacy-politics.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FAQComponent } from './faq/faq.component';

export const inicioRoutes: Routes = [

    {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', component: BodyComponent },
          { path: 'terminos-condiciones', component: TermsConditionsComponent},
          { path: 'politicas-privacidad', component: PrivacyPoliticsComponent},
          { path: 'equipo', component: EquipoComponent},
          { path: 'contactanos', component: ContactanosComponent},
          { path: 'nosotros', component: NosotrosComponent},
          { path: 'preguntas-respuestas', component: FAQComponent}
        ]
    }
];
