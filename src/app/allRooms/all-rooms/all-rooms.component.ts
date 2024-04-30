import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
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
export class AllRoomsComponent implements OnInit, AfterViewChecked {
  constructor(
    private api: ApiCallsService,
    private activeRoute: ActivatedRoute,
    private routingState: RoutingStateManegmentService
  ) {}
  rooms!: Hotelroom[];
  searchingInject = inject(RoutingStateManegmentService);
  @ViewChild('roomsInTemplet') roomsInTemplet!: ElementRef;
  siteIsInSearchState = false;
  handelingParamsArgument() {
    this.activeRoute.params.subscribe((data: Params) => {
      if (data['id'] == 0) {
        this.rooms = this.api.allRooms;
      } else if (data['id'] > 0) {
        this.rooms = this.api.allRooms.filter((items: Hotelroom) => {
          return items.roomTypeId === +data['id'];
        });
      }
      this.routingState.currentPage = +data['id'];
      this.routingState.fillterOptionsChanged.next(+data['id']);
      this.routingState.gettingLengthOfRooms.next(this.rooms.length);
    });
  }
  ngOnInit(): void {
    this.handelingParamsArgument();
  }
  ngAfterViewChecked(): void {}
}
