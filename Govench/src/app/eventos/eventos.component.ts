import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EventService } from '../Services/event.service';
import { CommonModule } from '@angular/common';
import { Event } from "../Class/event";
import { Location } from "../Class/location";

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})


export class EventosComponent implements OnInit{
eventos:Event[];

constructor(private eventservice:EventService){}

ngOnInit(): void {
    this.getEvents();
  }
  
private getEvents()
{
  this.eventservice.getevents().subscribe
  ( dato =>
      {
      this.eventos = dato;
      } 
  )
}
  
}
