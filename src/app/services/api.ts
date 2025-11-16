import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  idHotel: number;
  nombreHotel: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface Habitacion {
  idHabitacion: number;
  idHotel: number;
  numeroHabitacion: string;
  tipoHabitacion: string;
  descripcionHabitacion: string;
  estado: string;
  tiempoReservado?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Obtener todos los hoteles
  getHoteles(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotel/hoteles`);
  }

getHabitacionesPorHotel(idHotel: number): Observable<Habitacion[]> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.get<Habitacion[]>(
    `${this.apiUrl}/habitacion/habitaciones/${idHotel}`,
    { headers }
  );
  }
}