import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})

export class FAQComponent {

  faqItems: FaqItem[] = [
    {
      question: '¿Qué es Govench?',
      answer: 'Govench es una plataforma que conecta a profesionales y entusiastas de la tecnología, permitiéndoles participar en eventos, talleres y conferencias del sector tecnológico. También ofrece la posibilidad de organizar eventos propios.',
      isOpen: false
    },
    {
      question: '¿Cómo puedo participar en un evento?',
      answer: 'Para participar en un evento, primero debes registrarte en la plataforma. Una vez registrado, puedes explorar los eventos disponibles y inscribirte en aquellos que te interesen.',
      isOpen: false
    },
    {
      question: '¿Puedo organizar mi propio evento en Govench?',
      answer: 'Sí, Govench permite a los usuarios crear y organizar sus propios eventos tecnológicos. Simplemente inicia sesión, ve a la sección de "Crear Evento" y sigue las instrucciones para configurar y publicar tu evento.',
      isOpen: false
    },
    {
      question: '¿Es gratuito usar Govench?',
      answer: 'El registro y el uso básico de Govench son gratuitos. Sin embargo, algunos eventos pueden tener un costo de entrada, que será determinado por los organizadores del evento.',
      isOpen: false
    },
    {
      question: '¿Cómo puedo conectar con otros profesionales en Govench?',
      answer: 'Govench ofrece funciones de networking que te permiten conectar con otros asistentes durante los eventos. También puedes participar en foros de discusión y grupos temáticos dentro de la plataforma.',
      isOpen: false
    }
  ];

  toggleAnswer(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

}
