import { Injectable } from '@angular/core';
import {
  BookedRoomType,
  Hotelroom,
  PostType,
} from '../hotelRoomInterface/hotelRoomType';
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
  gettingBookedRooms() {
    return this.http.get<BookedRoomType[]>(
      'https://hotelbooking.stepprojects.ge/api/Booking'
    );
  }
  deletingFromBooking(id: number) {
    return this.http.delete(
      `https://hotelbooking.stepprojects.ge/api/Booking/${id}`,
      { responseType: 'text' }
    );
  }

  constructor(private http: HttpClient) {}
}
