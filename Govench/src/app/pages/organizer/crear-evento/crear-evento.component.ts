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
      exp: ['', [Validators.required]],
      maxCapacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  toggleCostoInput(): void {
    const eventType = this.createEventForm.get('type')?.value;
    this.isCostoVisible = eventType === 'premium';
    
    if (this.isCostoVisible) {
      // Habilita el campo 'cost' y le aplica validación de requerimiento
      this.createEventForm.get('cost')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      this.createEventForm.get('cost')?.enable();
      this.createEventForm.get('cost')?.setValue(''); // Permite ingreso de valor cuando es premium
    } else {
      // Si es gratuito, se deshabilita el campo y se establece el valor 0
      this.createEventForm.get('cost')?.setValue('0');
      this.createEventForm.get('cost')?.clearValidators();
      this.createEventForm.get('cost')?.disable();
    }
    this.createEventForm.get('cost')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.createEventForm.valid) {

      
      if (this.createEventForm.get('type')?.value === 'free') {
        this.createEventForm.get('cost')?.setValue('0', { emitEvent: false });
      }
      
      const eventData = this.createEventForm.getRawValue();
      console.log(eventData);
      this.eventService.crearEvento(eventData).subscribe({
        next:() => {
          this.showSnackbar('Evento creado con éxito');
          this.router.navigateByUrl('/organizer/eventos/creados')
        },
        error:() =>{
            this.showSnackbar('Error al crear evento');
        }

      })
    } else {
      this.showSnackbar('Por favor, complete todos los campos obligatorios');
    }
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }
}
