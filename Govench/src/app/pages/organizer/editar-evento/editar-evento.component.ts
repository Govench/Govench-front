import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event/event.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EventRequest } from '../../../shared/models/event/eventRequest.model';
import { EventsDetails } from '../../../shared/models/event/events-details.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../../core/services/user/user.profile.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent{
  editEventForm: FormGroup;
  isCostVisible: boolean = false;
  event: EventsDetails;
  profileImageUrl:boolean=false;
  selectedFile: File | null = null;
  isVirtualMode: boolean = false; 
  minDate: string="";
  minTime!: string;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private userService = inject(UserProfileService);
  private eventService = inject(EventService);

  constructor() {
    this.editEventForm = this.fb.group({
      tittle: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      cost: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxCapacity: ['', [Validators.required, Validators.min(1)]],
      department: ['', Validators.required],
      province: ['', Validators.required],
      link:['', [Validators.required]],
      district: ['', Validators.required],
      address: ['', Validators.required],
      mode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadEvent();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegura que esté en el inicio del día.
    this.minDate = today.toISOString().split('T')[0];
  
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Formato HH
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Formato MM
    this.minTime = `${hours}:${minutes}`;
  }

  toggleCostInput(): void {
    const type = this.editEventForm.get('type')?.value;
    this.isCostVisible = type === 'Premium';
    if (this.isCostVisible) {
      this.editEventForm.get('cost')?.enable();
    } else {
      this.editEventForm.get('cost')?.disable();
      this.editEventForm.get('cost')?.setValue(0);
    }
  }
  toggleAddressFields(): void {
    const mode = this.editEventForm.get('mode')?.value;
    this.isVirtualMode = mode === 'Virtual';
  
    if ( this.isVirtualMode) {
      this.editEventForm.patchValue({
        address: 'Virtual',
        department: '',
        province: '',
        district: ''
      });
      this.editEventForm.get('address')?.disable();
      this.editEventForm.get('department')?.disable();
      this.editEventForm.get('province')?.disable();
      this.editEventForm.get('district')?.disable();
      this.editEventForm.get('link')?.enable();
    } else {
      this.editEventForm.get('address')?.enable();
      this.editEventForm.get('department')?.enable();
      this.editEventForm.get('province')?.enable();
      this.editEventForm.get('district')?.enable();
      this.editEventForm.get('link')?.disable();
      // Solo limpiamos los campos si estaban en 'Virtual'
      if (this.editEventForm.get('address')?.value === 'Virtual') {
        this.editEventForm.patchValue({
          address: '',
          department: '',
          province: '',
          district: ''
        });
      }
    }
  }

  loadEvent(): void {
    const eventId = parseInt(this.router.url.split('/')[5])
    this.eventService.getEventById(eventId).subscribe({
      next: (eventData) => {
        this.event = eventData;
        // Excluir 'type' de los datos a parchear
        const { type, ...rest } = eventData;
        this.editEventForm.patchValue({
          ...rest,
          address: eventData.location.address,
          department: eventData.location.departament,
          province: eventData.location.province,
          district: eventData.location.district
        });
      },
      error: (err) => {
        console.error('Error al obtener el evento', err);
      }
    });
  }


  onSubmit(){
    if (this.editEventForm.valid) {
      const eventData = {...this.editEventForm.getRawValue()};
      delete eventData['mode'];

      const eventId = parseInt(this.router.url.split('/')[5])

      this.eventService.updateEvent(eventId, eventData).subscribe({
        next: () => {
          this.snackbar.open('Evento actualizado con éxito', 'Cerrar', { duration: 2000 });
          this.router.navigate(['/organizer/eventos/creados']);
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar el evento', 'Cerrar', { duration: 2000 });
          this.snackbar.open(error.error, 'Cerrar', { duration: 2000 });
        }
      })
    } else {
      this.snackbar.open('Por favor, complete todos los campos obligatorios', 'Cerrar', { duration: 2000 });
    }
  }

  Volver(): void {
    this.router.navigate(['/organizer/eventos/creados']);
  }

}