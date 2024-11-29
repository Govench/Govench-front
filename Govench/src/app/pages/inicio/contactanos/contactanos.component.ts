import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.scss'
})
export class ContactanosComponent {

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Aquí puedes implementar la lógica para enviar el formulario
    // Reiniciar el formulario después de enviarlo
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}