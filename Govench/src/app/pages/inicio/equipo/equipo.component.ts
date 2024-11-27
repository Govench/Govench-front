import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.scss'
})
export class EquipoComponent {

  teamMembers = [
    {
      name: 'Acevedo Villaena Dylan',
      age: 19,
      role: 'Desarrollador',
      study: 'Ingeniería de Computación y Sistemas',
      image: 'assets/images/dylan.jpg'
    },
    {
      name: 'Aguilar Blass Javier',
      age: 19,
      role: 'Desarrollador',
      study: 'Ingeniería de Computación y Sistemas',
      image: 'assets/images/javier.jpg'
    },
    {
      name: 'Escobar Gomez Miguel',
      age: 18,
      role: 'Desarrollador',
      study: 'Ingeniería de Computación y Sistemas',
      image: 'assets/images/miguel.jpg'
    },
    {
      name: 'Guevara Villalbos Gino',
      age: 20,
      role: 'Desarrollador',
      study: 'Ingeniería de Computación y Sistemas',
      image: 'assets/images/gino.jpg'
    },
    {
      name: 'Palomino Cuenca Jaime',
      age: 19,
      role: 'Desarrollador',
      study: 'Ingeniería de Computación y Sistemas',
      image: 'assets/images/jaime.jpg'
    }
  ];

}
