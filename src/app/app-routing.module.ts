import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AllRoomsComponent } from './allRooms/all-rooms/all-rooms.component';
import { FilteredRoomsComponent } from './allRooms/filteredRoom/filtered-rooms/filtered-rooms.component';
import { BookingInformationComponent } from './bookingInformation/booking-information/booking-information.component';
import { AllBookedRoomsComponent } from './allbookedRooms/all-booked-rooms/all-booked-rooms.component';
import { HotelsComponent } from './hotels/hotels/hotels.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    component: FilteredRoomsComponent,
    children: [{ path: ':id', component: AllRoomsComponent }],
  },
  { path: 'bookroom/:type/:id', component: BookingInformationComponent },
  { path: 'allbookroom', component: AllBookedRoomsComponent },
  { path: 'allbookroom/:id', component: AllBookedRoomsComponent },
  { path: 'hotels', component: HotelsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
