import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';

interface Hotel {
  idHotel: number;
  nombreHotel: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface Habitacion {
  idHabitacion: number;
  idHotel: number;
  numeroHabitacion: string;
  tipoHabitacion: string;
  descripcionHabitacion: string;
  estado: string;
  tiempoReservado?: string;
}

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelListComponent {
  private apiService = inject(ApiService);
  
  hoteles = signal<Hotel[]>([]);
  habitaciones = signal<Habitacion[]>([]);
  hotelSeleccionado = signal<Hotel | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    this.cargarHoteles();
  }

  async cargarHoteles(): Promise<void> {
    this.loading.set(true);
    try {
      const data = await this.apiService.getHoteles().toPromise();
      this.hoteles.set(data || []);
    } catch (error) {
      console.error('Error cargando hoteles:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async seleccionarHotel(hotel: Hotel): Promise<void> {
    this.hotelSeleccionado.set(hotel);
    this.loading.set(true);
    try {
      const data = await this.apiService.getHabitacionesPorHotel(hotel.idHotel).toPromise();
      this.habitaciones.set(data || []);
    } catch (error) {
      console.error('Error cargando habitaciones:', error);
    } finally {
      this.loading.set(false);
    }
  }

  volverALista(): void {
    this.hotelSeleccionado.set(null);
    this.habitaciones.set([]);
  }

  // Métodos auxiliares para filtrar habitaciones
  getHabitacionesDisponibles(): Habitacion[] {
    return this.habitaciones().filter(h => h.estado === 'Disponible');
  }

  getHabitacionesOcupadas(): Habitacion[] {
    return this.habitaciones().filter(h => h.estado === 'Ocupada');
  }
}