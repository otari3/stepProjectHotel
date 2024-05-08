import { Component, OnInit, inject } from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Hotelroom } from '../../shared/hotelRoomInterface/hotelRoomType';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';
import { getLocaleMonthNames } from '@angular/common';

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
  unFilteredRooms!: Hotelroom[];
  rooms!: Hotelroom[];
  searchingInject = inject(RoutingStateManegmentService);
  handelingParamsArgument() {
    this.activeRoute.params.subscribe((data: Params) => {
      if (data['id'] == 0) {
        this.rooms = this.api.allRooms;
      } else if (data['id'] > 0) {
        this.rooms = this.api.allRooms.filter((items: Hotelroom) => {
          return items.roomTypeId === +data['id'];
        });
      }
      this.unFilteredRooms = this.rooms;
      this.routingState.currentPage = +data['id'];
      this.routingState.fillterOptionsChanged.next(+data['id']);
      this.routingState.gettingLengthOfRooms.next(this.rooms.length);
    });
  }
  handelingQueryParems() {
    this.activeRoute.queryParams.subscribe((data: any) => {
      if (Object.keys(data).length > 1) {
        let maxPrice = 10000;
        if (data['to'] == '') {
          maxPrice = 10000;
        } else {
          maxPrice = data['to'];
        }
        this.rooms = this.unFilteredRooms.filter((items: Hotelroom) => {
          return (
            items.pricePerNight > data['from'] && items.pricePerNight < maxPrice
          );
        });
        this.routingState.gettingLengthOfRooms.next(this.rooms.length);
        this.routingState.gettingQueryParemsData.next(data);
      } else if (this.unFilteredRooms) {
        this.rooms = this.unFilteredRooms;
        this.routingState.handelingIfUserResetsFilter.next();
        this.routingState.gettingLengthOfRooms.next(this.rooms.length);
      }
    });
  }
  ngOnInit(): void {
    this.handelingParamsArgument();
    this.handelingQueryParems();
  }
}
