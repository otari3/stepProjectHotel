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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingFormComponent } from './bookingInformation/bookingForm/booking-form/booking-form.component';
import { OverviewComponent } from './bookingInformation/overview/overview/overview.component';
import { UspSectionComponent } from './home/uspSection/usp-section/usp-section.component';
import { HotelsComponent } from './hotels/hotels/hotels.component';

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
    BookingFormComponent,
    OverviewComponent,
    UspSectionComponent,
    HotelsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
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
