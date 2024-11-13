import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event/event.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent {
  
  createEventForm: FormGroup;
  isCostoVisible: boolean = false;
  isVirtualMode: boolean = false; // Indica si el evento es virtual

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private eventService = inject(EventService);

  constructor() {
    this.createEventForm = this.fb.group({
      tittle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      type: ['', [Validators.required]], 
      cost: [{ value: '0', disabled: true }, [Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required]],
      department: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      exp: ['', [Validators.required]],
      maxCapacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  toggleCostoInput(): void {
    const eventType = this.createEventForm.get('type')?.value;
    this.isCostoVisible = eventType === 'Premium';
    
    if (this.isCostoVisible) {
      this.createEventForm.get('cost')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      this.createEventForm.get('cost')?.enable();
      this.createEventForm.get('cost')?.setValue('');
    } else {
      this.createEventForm.get('cost')?.setValue('0');
      this.createEventForm.get('cost')?.clearValidators();
      this.createEventForm.get('cost')?.disable();
    }
    this.createEventForm.get('cost')?.updateValueAndValidity();
  }

  toggleAddressFields(): void {
    const mode = this.createEventForm.get('mode')?.value;
    this.isVirtualMode = mode === 'Virtual';

    if (this.isVirtualMode) {
      this.createEventForm.patchValue({
        address: 'Virtual',
        department: 'Virtual',
        province: 'Virtual',
        district: 'Virtual'
      });
      this.createEventForm.get('address')?.disable();
      this.createEventForm.get('department')?.disable();
      this.createEventForm.get('province')?.disable();
      this.createEventForm.get('district')?.disable();
    } else {
      this.createEventForm.get('address')?.enable();
      this.createEventForm.get('department')?.enable();
      this.createEventForm.get('province')?.enable();
      this.createEventForm.get('district')?.enable();
      this.createEventForm.patchValue({
        address: '',
        department: '',
        province: '',
        district: ''
      });
    }
  }

  onSubmit() {
    if (this.createEventForm.valid) {
      if (this.createEventForm.get('type')?.value === 'Gratis') {
        this.createEventForm.get('cost')?.setValue('0', { emitEvent: false });
      }
      
      const eventData = { ...this.createEventForm.getRawValue() };
      delete eventData['mode'];
  
      console.log("Datos enviados:", eventData); // Verificar en la consola antes de enviar
  
      this.eventService.crearEvento(eventData).subscribe({
        next: () => {
          this.showSnackbar('Evento creado con éxito');
          this.router.navigateByUrl('/organizer/eventos/creados');
        },
        error: (error) => {
          this.showSnackbar('Error al crear evento');
          console.error("Error del servidor:", error); // Imprime el error del servidor en consola
        }
      });
    } else {
      this.showSnackbar('Por favor, complete todos los campos obligatorios');
    }
  }
  

  showSnackbar(message: string) {

    this.snackbar.open(message, 'Cerrar', { duration: 2000, verticalPosition : 'top'});
  }
}
