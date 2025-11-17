import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';

export interface Habitacion {
  idHabitacion: number;
  idHotel: number;
  numeroHabitacion: string;
  tipoHabitacion: string;
  descripcionHabitacion: string;
  estado: string; // "A" o "I"
  tiempoReservado?: string;
}

@Component({
  selector: 'app-habitacion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habitacion-list.html',
  styleUrl: './habitacion-list.css',
})
export class HabitacionListComponent implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  habitaciones = signal<Habitacion[]>([]);
  hotelId = signal<number | null>(null);
  hotelNombre = signal<string>('Hotel');
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idHotel = Number(params['idHotel']);
      if (idHotel) {
        this.hotelId.set(idHotel);
        this.cargarHabitaciones(idHotel);
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      const nombreHotel = queryParams['nombre'];
      if (nombreHotel) {
        this.hotelNombre.set(nombreHotel);
      } else {
        const idHotel = this.hotelId();
        if (idHotel) {
          this.hotelNombre.set(`Hotel ${idHotel}`);
        }
      }
    });
  }

  async cargarHabitaciones(idHotel: number): Promise<void> {
    console.log('🔍 ID Hotel:', idHotel);
    console.log('🔗 URL que se intentará:', `http://localhost:8080/habitaciones/${idHotel}`);

    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.apiService.getHabitacionesPorHotel(idHotel).toPromise();
      console.log('✅ Datos recibidos:', data);
      console.log('📊 Cantidad de habitaciones:', data?.length);

      this.habitaciones.set(data || []);
      if (data?.length === 0) {
        this.error.set('No se encontraron habitaciones para este hotel');
      }

    } catch (error: any) {
      console.error('❌ Error completo:', error);
      console.error('❌ Status:', error?.status);
      console.error('❌ Mensaje:', error?.message);
      this.error.set('Error al cargar las habitaciones: ' + (error?.message || 'Desconocido'));
    } finally {
      this.loading.set(false);
    }
  }

  volverAHoteles(): void {
    this.router.navigate(['/hoteles']);
  }

  // Métodos para mapear estados
  getHabitacionesDisponibles(): Habitacion[] {
    return this.habitaciones().filter(h => h.estado === 'A');
  }

  getHabitacionesOcupadas(): Habitacion[] {
    return this.habitaciones().filter(h => h.estado === 'I');
  }

  getEstadoLegible(habitacion: Habitacion): string {
    return habitacion.estado === 'A' ? 'Disponible' : 'Ocupada';
  }

  isDisponible(habitacion: Habitacion): boolean {
    return habitacion.estado === 'A';
  }

  getTiempoReservado(habitacion: Habitacion): string {
    return habitacion.tiempoReservado || 'No especificado';
  }
}