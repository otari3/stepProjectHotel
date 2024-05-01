import { Injectable } from '@angular/core';
import { Hotelroom } from '../hotelRoomInterface/hotelRoomType';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  allRooms!: Hotelroom[];

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

  constructor(private http: HttpClient) {}
}
