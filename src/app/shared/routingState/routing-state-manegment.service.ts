import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingStateManegmentService {
  previus: string = '/';
  fillterOptionsChanged = new Subject<number>();
  gettingLengthOfRooms = new Subject<number>();

  constructor() {}
}
