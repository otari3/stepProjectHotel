import { Component, Input, OnInit } from '@angular/core';
import { Hotelroom } from '../../../shared/hotelRoomInterface/hotelRoomType';
import { ApiCallsService } from '../../../shared/api/api-calls.service';

@Component({
  selector: 'app-favourite-rooms',
  templateUrl: './favourite-rooms.component.html',
  styleUrl: './favourite-rooms.component.scss',
})
export class FavouriteRoomsComponent implements OnInit {
  favoriteHotelRooms: Hotelroom[] = [];
  constructor(private api: ApiCallsService) {}
  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      this.favoriteHotelRooms.push(this.api.allRooms[i]);
    }
  }
}
