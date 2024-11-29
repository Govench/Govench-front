import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup,FormArray ,FormsModule,ReactiveFormsModule, Validators, FormControl} from '@angular/forms';
import { UserProfile } from '../../../models/user/user-profile-model';
import { RouterLink,Router } from '@angular/router';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { environment } from '../../../../../environments/environment';
import { UserProfileService } from '../../../../core/services/user/user.profile.service';
import { AuthServiceService } from '../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  profileform:FormGroup;
  profile : UserProfile;
  private fb = inject(FormBuilder);
  private userService = inject(UserProfileService);
  private authService = inject(AuthServiceService);
  private router= inject(Router);
  private snackbar = inject(MatSnackBar);
  profileImageUrl: SafeUrl;
  selectedFile: File | null = null;
  private sanitizer=inject(DomSanitizer);
  private photoURL =`${environment.baseURL}/user`;
  constructor()
  {
    this.profileform = this.fb.group (
      {
        name: ['',[Validators.required,]],
        lastname :['',[Validators.required,]],
        profileDesc : ['',[Validators.required,]],
        gender: ['',[Validators.required,]],
        birthday :['',[Validators.required,]],
        interest: this.fb.array([]), // Usamos FormArray para interest
        skills: this.fb.array([]),  // Usamos FormArray para skills
        socialLinks: this.fb.array([]),   // Usamos FormArray para links
      }
    )
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile():void
  { const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.profileform.patchValue(profile);
          this.setFormArrayValues(this.interest, profile.interest);
          this.setFormArrayValues(this.skills, profile.skills);
          this.setFormArrayValues(this.socialLinks, profile.socialLinks);
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil');
        }
      });
      this.userService.getProfileImage(userId).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (error) => {
          console.error('Error al cargar la imagen de perfil:', error);
        }
      });
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
  onSubmit() :void
  { 
    if(this.profileform.valid)
    {
      const updatedData= {...this.profile,...this.profileform.value};
      this.userService.updateUserProfile(this.profile.id, updatedData).subscribe(
        {
          next: () => {
            this.showSnackBar('Perfil Actualizado Exitosamente.');
            if(this.authService.getUser()?.role=='ROLE_ORGANIZER')
              {
                
            if (this.selectedFile) 
              {
                this.userService.uploadProfileImage(this.selectedFile).subscribe({
                  next: () => {
                    this.showSnackBar('Imagen de perfil subida exitosamente.');
                    this.refreshProfileImage(this.profile.id)
                  },
                  error: (error) => {
                    console.error('Error al subir la imagen:', error);
                    this.showSnackBar('Error al subir la imagen.');
                  }
                });
              }
              else
              {
                this.router.navigate(['/organizer/cuenta/profile'])
              }
              }
            else
              {
                if (this.selectedFile) 
                  {
                    this.userService.uploadProfileImage(this.selectedFile).subscribe({
                      next: () => {
                        this.showSnackBar('Imagen de perfil subida exitosamente.');
                        this.refreshProfileImage(this.profile.id)
                      },
                      error: (error) => {
                        console.error('Error al subir la imagen:', error);
                        this.showSnackBar('Error al subir la imagen.');
                      }
                    });
                  }
                  else
                  {
                    this.router.navigateByUrl('/participant/cuenta/profile');
                  }
              }


           
          },
          error: (error) => {
            this.showSnackBar(error.error?.message || 'Error al actualizar el perfil');
          }          
        }
      );
  
    }
  }

  refreshProfileImage(userId: number): void { 
    this.userService.getProfileImage(userId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        if(this.authService.getUser()?.role=='ROLE_ORGANIZER')
          {
            this.router.navigate(['/organizer/cuenta'])
          }
          else
          {
            this.router.navigate(['/participant/cuenta'])
          }
      },
      error: (error) => {
        console.error('No tienes ninguna foto asociada', error);
        this.profileImageUrl = ""; 
      }
    });

  }

  removeProfileImage():void{
    this.userService.deleteProfileImage().subscribe(
      {
        next: () =>
        {
          this.showSnackBar('Foto eliminada correctamente');
          if (this.profileImageUrl) {
            URL.revokeObjectURL(this.profileImageUrl as string);
            this.profileImageUrl = "";
          }
        },
        error : (error) => {
          this.showSnackBar(error.error?.message || 'Error al eliminar la foto de perfil');
        }
      }
    );
  }

  controlHasError(control : string, error: string)
  {
      return this.profileform.controls[control].hasError(error);
  }
  controlHasArrayError(control: string, error: string, index: number): boolean {
    const formArray = this.profileform.get(control) as FormArray;
    return formArray.at(index).hasError(error) && (formArray.at(index).touched || formArray.at(index).dirty);
}


  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }

  private setFormArrayValues(formArray: FormArray, values: string[]): void {
    formArray.clear(); // Limpia el FormArray antes de llenarlo
    values.forEach(value => formArray.push(this.fb.control(value, Validators.required)));
  }

  get interest(): FormArray {
    return this.profileform.get('interest') as FormArray;
  }
  
  get skills(): FormArray {
    return this.profileform.get('skills') as FormArray;
  }
  
  get socialLinks(): FormArray {
    return this.profileform.get('socialLinks') as FormArray;
  }
  
  addInterest(interest: string): void {
    if (this.interest.length === 0 || this.interest.at(this.interest.length - 1).value) {
      this.interest.push(this.fb.control(interest, Validators.required));
    } else {
      this.showSnackBar('Por favor, completa el interés anterior antes de agregar otro.');
    }
  }
  
  addSkill(skill: string): void {
    if(this.skills.length === 0 || this.skills.at(this.skills.length-1).value)
    {
      this.skills.push(this.fb.control(skill, Validators.required));
    }else {
      this.showSnackBar('Por favor, completa la hablidad anterior antes de agregar otra.');
    }

  }
  
  addLink(link: string): void {
    if(this.socialLinks.length === 0 || this.socialLinks.at(this.socialLinks.length-1).value)
      {
        this.socialLinks.push(this.fb.control(link, Validators.required));
      }
      else {
        this.showSnackBar('Por favor, completa el link anterior antes de agregar otro.');
      }
  }
  
  removeInterest(index: number): void {
    this.interest.removeAt(index);
  }
  
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
  
  removeLink(index: number): void {
    this.socialLinks.removeAt(index);
  }
}
