import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Hotelroom } from '../../shared/hotelRoomInterface/hotelRoomType';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.scss',
})
export class AllRoomsComponent implements OnInit {
  constructor(
    private api: ApiCallsService,
    private activeRoute: ActivatedRoute,
    private routingState: RoutingStateManegmentService
  ) {}
  rooms!: Hotelroom[];
  @ViewChild('roomsInTemplet') roomsInTemplet!: ElementRef;
  handelingParamsArgument() {
    this.activeRoute.params.subscribe((data: Params) => {
      if (data['id'] == 0) {
        this.rooms = this.api.allRooms;
      } else if (data['id'] > 0) {
        this.rooms = this.api.allRooms.filter((items: Hotelroom) => {
          return items.roomTypeId === +data['id'];
        });
      }
      this.routingState.fillterOptionsChanged.next(+data['id']);
      this.routingState.gettingLengthOfRooms.next(this.rooms.length);
    });
  }
  ngOnInit(): void {
    this.handelingParamsArgument();
  }
}
