import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user/user-profile-model';
import { UserProfileService } from '../../../core/services/user/user.profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  userAvailable: UserProfile[] = [];
  filterUsers: UserProfile[] = []; // Lista de usuarios filtrados
  profileImageUrl: SafeUrl; // La imagen de perfil se mantiene como estaba
  searchQuery: string = ''; // El término de búsqueda
  
  private loadingService = inject(LoadingService);
  private userProfileService = inject(UserProfileService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private sanitizer = inject(DomSanitizer);

  isLoading$ = this.loadingService.isLoading$;

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.userProfileService.getAllUser().subscribe({
      next:(user) => {
        this.userAvailable = user;
        this.filterUsers = user;
        this.loadingService.setLoading(false);
        this.userAvailable.forEach(user => {
          this.getUserPhoto(user.id,user);
        });
      }
      // Cargar los usuarios cuando el componente se inicialice
  })
}

getUserPhoto(userId: number, user: UserProfile): void {
  this.userProfileService.getProfileImage(userId).subscribe({
    next: (blob: Blob) => {
      const objectURL = URL.createObjectURL(blob);
      user.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL) as string;
    },
    error: (error) => {
      console.error(`Error al cargar la imagen de perfil del usuario con ID ${userId}:`, error);
      user.profileImageUrl = 'https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png'; // Imagen por defecto
    }
  });
}
   // Método para filtrar usuarios por nombre (y otros criterios si los añades)
  onSearch() {
    const query = this.searchQuery.toLocaleLowerCase();
    this.filterUsers = this.userAvailable.filter(user => {
      const matchesQuery = user.name.toLocaleLowerCase().includes(query) || user.lastname.toLocaleLowerCase().includes(query);
      return matchesQuery; // Filtra solo aquellos usuarios que coinciden con el término de búsqueda
    });
  }
  

  // Método para navegar a los detalles de un usuario
  navigateToDetailUser(userId: number) {
  
    // Verifica si la ruta contiene '/organizer' o '/participant' para determinar a qué tipo de usuario pertenecemos
    const isOrganizer = this.router.url.includes('/organizer');
    const baseUrl = isOrganizer ? '/organizer/cuenta' : '/participant/cuenta';
 
    this.router.navigate([`${baseUrl}/search/user`, userId]);
  }
  

}
