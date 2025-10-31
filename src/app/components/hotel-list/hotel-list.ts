import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.css'
})
export class HotelListComponent {
  private apiService = inject(ApiService);
  
  hoteles = signal<Hotel[]>([]);
  habitaciones = signal<Habitacion[]>([]);
  hotelSeleccionado = signal<Hotel | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarHoteles();
  }

  async cargarHoteles(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.apiService.getHoteles().toPromise();
      this.hoteles.set(data || []);
      if (data?.length === 0) {
        this.error.set('No se encontraron hoteles disponibles');
      }
    } catch (error) {
      console.error('Error cargando hoteles:', error);
      this.error.set('Error al cargar los hoteles. Intente nuevamente.');
    } finally {
      this.loading.set(false);
    }
  }

  // ✅ FUNCIÓN RECARGAR HOTELES IMPLEMENTADA
  async recargarHoteles(): Promise<void> {
    console.log('🔄 Recargando lista de hoteles...');
    await this.cargarHoteles();
  }

  async seleccionarHotel(hotel: Hotel): Promise<void> {
    this.hotelSeleccionado.set(hotel);
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.apiService.getHabitacionesPorHotel(hotel.idHotel).toPromise();
      this.habitaciones.set(data || []);
      if (data?.length === 0) {
        this.error.set('No se encontraron habitaciones para este hotel');
      }
    } catch (error) {
      console.error('Error cargando habitaciones:', error);
      this.error.set('Error al cargar las habitaciones. Intente nuevamente.');
    } finally {
      this.loading.set(false);
    }
  }

  volverALista(): void {
    this.hotelSeleccionado.set(null);
    this.habitaciones.set([]);
    this.error.set(null);
  }

  // Métodos auxiliares para filtrar habitaciones
  getHabitacionesDisponibles(): Habitacion[] {
    return this.habitaciones().filter(h => 
      h.estado.toLowerCase() === 'disponible' || h.estado === 'Disponible'
    );
  }

  getHabitacionesOcupadas(): Habitacion[] {
    return this.habitaciones().filter(h => 
      h.estado.toLowerCase() === 'ocupada' || h.estado === 'Ocupada'
    );
  }

  // Método adicional para contar habitaciones por estado
  getTotalHabitaciones(): number {
    return this.habitaciones().length;
  }

  // Método para formatear el tiempo reservado (si existe)
  getTiempoReservado(habitacion: Habitacion): string {
    return habitacion.tiempoReservado || 'No especificado';
  }
}