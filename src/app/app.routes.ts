import { Routes } from '@angular/router';
import { HotelListComponent } from './components/hotel-list/hotel-list';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [  
  { path: '', component: HotelListComponent },
  { path: 'hoteles', component: HotelListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
