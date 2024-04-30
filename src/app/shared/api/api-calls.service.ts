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
        .subscribe((data: Hotelroom[]) => {
          this.allRooms = data;
          res();
        });
    });
  }

  constructor(private http: HttpClient) {}
}
