import { Routes } from '@angular/router';
import { HotelListComponent } from './components/hotel-list/hotel-list';
import { LoginComponent } from './components/login/login.component';
import { HabitacionListComponent } from './components/habitacion-list/habitacion-list';

export const routes: Routes = [  
  { path: '', component: HotelListComponent },
  { path: 'hoteles', component: HotelListComponent },
  { path: 'habitaciones/:idHotel', component: HabitacionListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
