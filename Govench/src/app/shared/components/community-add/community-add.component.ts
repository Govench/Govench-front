import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComunityService } from '../../../core/services/comunity/comunity.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-community-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './community-add.component.html',
  styleUrl: './community-add.component.scss'
})
export class CommunityAddComponent {
  createCommunityForm: FormGroup;
  baseRoute: string;
  private snackbar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private comunityService: ComunityService,
    private authService: AuthServiceService
  ) { }

  get tags(): FormArray {
    return this.createCommunityForm.get('tags') as FormArray;
  }

  addTag(tag: string): void {
    if (this.tags.length === 0 || this.tags.at(this.tags.length - 1).value) {
      this.tags.push(this.fb.control(tag, Validators.required));
    } else {
      this.snackbar.open('Completa esta antes de abrir otra', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  controlHasArrayError(control: string, error: string, index: number): boolean {
    const formArray = this.createCommunityForm.get(control) as FormArray;
    return formArray.at(index).hasError(error) && (formArray.at(index).touched || formArray.at(index).dirty);
  }

  ngOnInit(): void {
    this.createCommunityForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: [''],
      tags: this.fb.array([]),
      terms: [false, Validators.requiredTrue]
    });
    this.setBaseRoute();
  }

  setBaseRoute() {
    const user = this.authService.getUser();
    if (user?.role === 'ROLE_ORGANIZER') {
      this.baseRoute = '/organizer';
    } else {
      this.baseRoute = '/participant';
    }
  }
 
  onSubmit(): void {
    if (this.createCommunityForm.valid) {
      const communityData = {
        ...this.createCommunityForm.value,
        tags: this.tags.value.filter((tag: string) => tag.trim().length > 0),
      };

      console.log('Datos a enviar al servicio:', communityData);

      this.comunityService.createCommunity(communityData).subscribe({
        next: () => {
          this.showSnackbar('Comunidad creada exitosamente.', 'Cerrar');
          this.router.navigate([`${this.baseRoute}/comunidades/creados`]);
        },
        error: (error) => {
          this.showSnackbar(error.error?.message || 'Error al crear la comunidad.', 'Cerrar');
        }
      });
    } else {
      if (!this.createCommunityForm.get('terms')?.value) {
        this.showSnackbar('Debes aceptar los términos y condiciones para continuar.', 'Cerrar');
      } else {
        this.showSnackbar('El formulario tiene errores. Por favor, corrígelos.', 'Cerrar');
      }
    }
  }

  controlHasError(control: string, error: string): boolean {
    const hasError = this.createCommunityForm.controls[control].hasError(error);
    return hasError && (this.createCommunityForm.controls[control].touched || this.createCommunityForm.controls[control].dirty);

  }

  showSnackbar(message: string, action: string = '', duration: number = 2000): void {
    this.snackbar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}