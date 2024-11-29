import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComunityResponse } from '../../models/comunity/comunity-response.model';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../../core/services/auth/auth.service';
import { CommunityStateService } from '../../../core/services/comunity/comunity-state.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserProfileService } from '../../../core/services/user/user.profile.service';
import { UserProfile } from '../../models/user/user-profile-model';
import { PostRequest } from '../../models/post/post-request.model';

@Component({
  selector: 'app-comunity-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comunity-detail.component.html',
  styleUrl: './comunity-detail.component.scss'
})
export class ComunityDetailComponent {

  comunitieDetail: ComunityResponse;
  isJoined: boolean = false;
  MyId:number;
  MyuserProfile:UserProfile;
  private communityService = inject(ComunityService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private sanitizer=inject(DomSanitizer);
  private authService = inject(AuthServiceService);
  private userProfileService = inject(UserProfileService);
  private communityStateService = inject(CommunityStateService);
  comment: string = ''; 
  profileImageUrl: SafeUrl;
  existRating :boolean;
  ngOnInit(): void {
    this.existRating=false;
    this.detailEvent();
    this.loadMyProfile()
  }

  detailEvent(){
    const communityId = parseInt(this.router.url.split('/')[5])
    this.communityService.getCommunityById(communityId).subscribe(
      (comunitieDetail) => {
        this.isJoined = this.communityStateService.isJoined(communityId);

        
        console.log(this.isJoined);
        this.comunitieDetail = comunitieDetail;
        this.comunitieDetail.post.forEach(post => {

          this.userProfileService.getUserProfile(post.autor.id).subscribe({
            next: (autor) => {
              post.user=autor;
              this.getUserPhoto(post.autor.id, post.user);
            },
            error: (error) => {
              console.error('Error al obtener el perfil del autor:', error);
            }
          });
        });
      }
    )
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

loadMyProfile() {
  const userId = this.authService.getCurrentUserId();
  if (userId !== null) {
    this.userProfileService.getUserProfile(userId).subscribe({
      next: (profile) => {
        this.MyuserProfile = profile;
        this.loadMyPhoto(this.MyuserProfile.id)
      },
      error: () => {
       this.showSnackBar('Error al cargar el perfil:');
      },
    });
  } else {
    this.showSnackBar('Usuario no autenticado');
  }
}

loadMyPhoto(myId :number)
{ 

  if(myId!=null)
  {
    this.userProfileService.getProfileImage(myId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.error('Error al cargar la imagen de perfil:', error);
      }
    }); 
  }
  else
  {
    this.showSnackBar("Error al cargar tu foto de perfil");
  }
}
  volverComunidades() {
    const isOrganizer = this.router.url.includes('/organizer');
    if (isOrganizer) {
      if (this.router.url.includes('/disponibles')){
        this.router.navigate(['/organizer/comunidades/disponibles']);
      } else {
        if (this.router.url.includes('/perteneces')){
          this.router.navigate(['/organizer/comunidades/perteneces']);
        }
      }
    }else{
      if (this.router.url.includes('/disponibles')){
        this.router.navigate(['/participant/comunidades/disponibles']);
      } else {
        if (this.router.url.includes('/perteneces')){
          this.router.navigate(['/participant/comunidades/perteneces']);
        }
      }
    }
  }

  joinCommunity() {
    if (!this.comunitieDetail) return;
    
    this.communityService.joinCommunity(this.comunitieDetail.id).subscribe({
      next: (response) => {
        this.isJoined = true;
        this.communityStateService.setJoinedState(this.comunitieDetail.id, true);
        this.showSnackBar(response);
      },
      error: (error) => {
        this.showSnackBar(error.error);
      }
    });
  }

  leaveCommunity() {
    if (!this.comunitieDetail) return;

    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.communityService.leaveCommunity(userId, this.comunitieDetail.id).subscribe({
        next: (response) => {
          this.isJoined = false;
          this.communityStateService.setJoinedState(this.comunitieDetail.id, false);
          this.showSnackBar(response);
        },
        error: (error) => {
          this.showSnackBar(error.error);
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
  submitRating(form: NgForm) {
    if (!form.valid) {
      console.error('El formulario no es válido');
      return;
    }
  
    const post: PostRequest = {
      body: form.value.comment 
    };
  
    this.communityService.createPost(this.comunitieDetail.id,post).subscribe({
      next: () => {
        this.showSnackBar('Post creado exitosamente');
        form.reset();
        this.detailEvent();
      },
      error: (error) => {
        this.showSnackBar(error.error);
      }
    });
  
    console.log('Comentario enviado:', form.value.comment);
  }
}
