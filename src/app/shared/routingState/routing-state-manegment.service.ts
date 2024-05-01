import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hotelroom } from '../hotelRoomInterface/hotelRoomType';

@Injectable({
  providedIn: 'root',
})
export class RoutingStateManegmentService {
  previus: string = '/';
  fillterOptionsChanged = new Subject<number>();
  gettingLengthOfRooms = new Subject<number>();
  searching: string = '';
  currentPage!: number;
  currentQueryParems: any;
  gettingQueryParemsData = new Subject<{ from: string; to: string }>();
  handelingIfUserResetsFilter = new Subject<void>();
  handeningSearch(items: Hotelroom) {
    let search = this.searching.split(' ').join('').toLowerCase();
    let name = items.name.split(' ').join('').toLowerCase();
    if (name.match(search)) {
      return true;
    } else {
      return false;
    }
  }

  constructor() {}
}
