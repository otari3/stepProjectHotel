import { Injectable } from '@angular/core';
import { Hotelroom, PostType } from '../hotelRoomInterface/hotelRoomType';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  allRooms!: Hotelroom[];
  allHotels: any;

  gettingAllRooms() {
    return new Promise<void>((res, rej) => {
      this.http
        .get<Hotelroom[]>(
          'https://hotelbooking.stepprojects.ge/api/Rooms/GetAll'
        )
        .subscribe({
          next: (v) => {
            this.allRooms = v;
            res();
          },
          error: (e) => {
            alert('cant fetch date from allrooms');
            res();
          },
        });
    });
  }
  postingInBooking(bookIn: PostType) {
    return this.http.post(
      'https://hotelbooking.stepprojects.ge/api/Booking',
      bookIn,
      { responseType: 'text' }
    );
  }
  gettingHotels() {
    return this.http.get(
      'https://hotelbooking.stepprojects.ge/api/Hotels/GetHotels?city=tbilisi'
    );
  }

  constructor(private http: HttpClient) {}
}
