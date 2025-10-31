import { Routes } from '@angular/router';

import { HotelListComponent } from './components/hotel-list/hotel-list';

export const routes: Routes = [  
  { path: '', component: HotelListComponent },
  { path: 'hoteles', component: HotelListComponent },
  { path: '**', redirectTo: '' }
];
