import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { HomeComponent } from './home/home/home.component';
import { FavouriteRoomsComponent } from './home/guestsFavouriteRooms/favourite-rooms/favourite-rooms.component';
import { AllRoomsComponent } from './allRooms/all-rooms/all-rooms.component';
import { FilteredRoomsComponent } from './allRooms/filteredRoom/filtered-rooms/filtered-rooms.component';
import { BookingInformationComponent } from './bookingInformation/booking-information/booking-information.component';
import { AllBookedRoomsComponent } from './allbookedRooms/all-booked-rooms/all-booked-rooms.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallsService } from './shared/api/api-calls.service';
import { HeroImgComponent } from './home/heroImg/hero-img/hero-img.component';
import { SingleRoomComponent } from './singleRoom/single-room/single-room.component';
import { FormsModule } from '@angular/forms';

const initializeApp = (api: ApiCallsService) => {
  return () => {
    return api.gettingAllRooms();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FavouriteRoomsComponent,
    AllRoomsComponent,
    FilteredRoomsComponent,
    BookingInformationComponent,
    AllBookedRoomsComponent,
    HeroImgComponent,
    SingleRoomComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ApiCallsService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
