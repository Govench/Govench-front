import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../../core/services/event/event.service';
import { EventRequest } from '../../../shared/models/event/eventRequest.model';
import { EventsDetails } from '../../../shared/models/event/events-details.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {
  editEventForm: FormGroup;
  isCostVisible: boolean = false;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackbar = inject(MatSnackBar);
  private eventService = inject(EventService);
  eventId: number;

  constructor() {
    this.editEventForm = this.fb.group({
      tittle: [''],
      description: [''],
      date: [''],
      startTime: [''],
      endTime: [''],
      type: [''],
      cost: [{ value: '0', disabled: true }, Validators.pattern('^[0-9]*$')],
      address: [''],
      department: [''],
      province: [''],
      district: [''],
      maxCapacity: ['', Validators.pattern('^[0-9]*$')],
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.loadEventData();
  }

  loadEventData(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (eventData: EventsDetails) => {
        this.isCostVisible = eventData.type === 'Premium';
        this.editEventForm.patchValue(eventData);
        if (this.isCostVisible) {
          this.editEventForm.get('cost')?.enable();
        } else {
          this.editEventForm.get('cost')?.disable();
          this.editEventForm.get('cost')?.setValue('0');
        }
      },
      error: () => {
        this.snackbar.open('Error al cargar el evento', 'Cerrar', { duration: 2000 });
      }
    });
  }

  toggleCostInput(): void {
    const eventType = this.editEventForm.get('type')?.value;
    this.isCostVisible = eventType === 'Premium';

    if (this.isCostVisible) {
      this.editEventForm.get('cost')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      this.editEventForm.get('cost')?.enable();
      this.editEventForm.get('cost')?.setValue(''); // Deja el campo vacío para Premium
    } else {
      this.editEventForm.get('cost')?.clearValidators();
      this.editEventForm.get('cost')?.disable();
      this.editEventForm.get('cost')?.setValue('0'); // Asigna 0 para Gratuito
    }
    this.editEventForm.get('cost')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.editEventForm.valid) {
      const updatedEvent: EventRequest = this.editEventForm.getRawValue();
      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe({
        next: () => {
          this.snackbar.open('Evento actualizado con éxito', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/organizer/eventos/creados']);
        },
        error: () => {
          this.snackbar.open('Error al actualizar el evento', 'Cerrar', { duration: 2000 });
        }
      });
    } else {
      this.snackbar.open('Por favor, complete todos los campos obligatorios', 'Cerrar', { duration: 2000 });
    }
  }
  Volver()
  {
    this.router.navigate(['/organizer/eventos/creados'])
  }
}
