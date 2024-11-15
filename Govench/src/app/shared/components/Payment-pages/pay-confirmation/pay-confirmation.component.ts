import { Component, inject, Inject } from '@angular/core';
import { NavComponent } from "../../nav/nav.component";
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth/auth.service';
@Component({
  selector: 'app-pay-confirmation',
  standalone: true,
  imports: [NavComponent, FooterComponent,RouterLink],
  templateUrl: './pay-confirmation.component.html',
  styleUrl: './pay-confirmation.component.scss'
})
export class PayConfirmationComponent {
  router = inject(Router);
  authService=inject(AuthServiceService)

  navigateToEvents()
  {
    if(this.authService.getUser()?.role==='ROLE_ORGANIZER')
      {
        this.router.navigateByUrl('/organizer/eventos/registrados');
      }
      else{
        this.router.navigateByUrl('/participant/eventos/registrados');
      }
  }

}
