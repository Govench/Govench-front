import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/services/event/event.service';
import { ApiImgPipe } from '../../../core/pipes/api-img.pipe';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule, CommonModule,ApiImgPipe],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent {
  
  createEventForm: FormGroup;
  isCostoVisible: boolean = false;
  isVirtualMode: boolean = false;


  minDate: string="";
  minTime!: string;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private eventService = inject(EventService);
  showTimeWarning: boolean = false;
  profileImageUrl:boolean=false;
  selectedFile: File | null = null;

  
ngOnInit(): void {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  this.minDate = today.toISOString().split('T')[0];

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  this.minTime = `${hours}:${minutes}`;
  
  router : inject(Router);

}
  constructor() {
    this.createEventForm = this.fb.group({
      coverPath: ['', Validators.required],
      tittle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      type: ['', [Validators.required]], 
      cost: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      address: ['', [Validators.required]],
      department: ['', [Validators.required]],
      province: ['', [Validators.required]],
      district: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      link:['', [Validators.required]],
      exp: ['', [Validators.required]],
      maxCapacity: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]]
    });
  } 
  checkStartTime(): void {
    const selectedTime = this.createEventForm.get('startTime')?.value;
    const currentTime = new Date();
    const [selectedHours, selectedMinutes] = selectedTime.split(':').map(Number);
    
    if (
      selectedHours < currentTime.getHours() ||
      (selectedHours === currentTime.getHours() && selectedMinutes < currentTime.getMinutes())
    ) {
      this.showTimeWarning = true;
    } else {
      this.showTimeWarning = false;
    }
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
        department: ' ',
        province: ' ',
        district: ' '
      });
      this.createEventForm.get('address')?.disable();
      this.createEventForm.get('department')?.disable();
      this.createEventForm.get('province')?.disable();
      this.createEventForm.get('district')?.disable();
      this.createEventForm.get('link')?.enable();
    } else {
      this.createEventForm.get('address')?.enable();
      this.createEventForm.get('department')?.enable();
      this.createEventForm.get('province')?.enable();
      this.createEventForm.get('district')?.enable();
      this.createEventForm.get('link')?.disable();
      this.createEventForm.patchValue({
        address: '',
        department: '',
        province: '',
        district: '',
        link:''
      });
    }
  }

  onSubmit() {
    if (this.createEventForm.valid) {

      // Configura el costo a 0 si el tipo es "Gratis"
      if (this.createEventForm.get('type')?.value === 'Gratis') {
        this.createEventForm.get('cost')?.setValue('0', { emitEvent: false });
      }
  
      // Obtén los datos del formulario
      const eventData = { ...this.createEventForm.getRawValue() };
      delete eventData['mode'];  // Remueve el campo innecesario para el envío
  
  
      // Verifica si hay un archivo seleccionado
      if (this.selectedFile) {
        this.eventService.uploadCover(this.selectedFile).subscribe({
          next: (response) => {
            const coverPath = response.path;
  
            eventData.coverPath = coverPath;

            this.eventService.crearEvento(eventData).subscribe({
              next: () => {
                this.showSnackbar('Evento creado con éxito');
                this.router.navigateByUrl('/organizer/eventos/creados');
              },
              error: (error) => {
                const errorMessage = error.error  || 'Ocurrió un error al crear el evento';
                this.showSnackbar(errorMessage);
                console.error("Error del servidor:", error.error?.value); // Imprime el error del servidor en consola
                
              }
            });
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
            this.showSnackbar('Error al subir la imagen.');
          }
        });
      } else {

      }
    } else {
      this.showSnackbar('Por favor, complete todos los campos obligatorios');
    }
  }
 

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      // Añadir el nombre de la imagen al control coverPath para que el formulario lo reconozca
      this.createEventForm.patchValue({ coverPath: this.selectedFile.name });
      this.createEventForm.get('coverPath')?.updateValueAndValidity();
    }
  }

  showSnackbar(message: string) {

    this.snackbar.open(message, 'Cerrar', { duration: 2000, verticalPosition : 'top'});
  }
  Volver()
  {
    this.router.navigate(['/organizer/eventos/creados'])
  }

}
