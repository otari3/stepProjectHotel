import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';
import {
  Hotelroom,
  Image,
} from '../../shared/hotelRoomInterface/hotelRoomType';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrl: './booking-information.component.scss',
})
export class BookingInformationComponent implements OnInit {
  constructor(
    private route: Router,
    private routeStateManegment: RoutingStateManegmentService,
    private activtedRoute: ActivatedRoute,
    private api: ApiCallsService
  ) {}
  roomInformation!: Hotelroom | undefined;
  photosOfRoom: Image[] | undefined = [];
  otherRooms: Hotelroom[] = [];
  currentPhoto = 0;
  onGoBack() {
    if (this.routeStateManegment.currentQueryParems) {
      this.route.navigate(['rooms', this.routeStateManegment.currentPage], {
        queryParams: this.routeStateManegment.currentQueryParems,
      });
    } else if (!this.routeStateManegment.currentQueryParems) {
      this.route.navigate([this.routeStateManegment.previus]);
    }
  }
  gettingSingleRoom() {
    this.activtedRoute.params.subscribe((data: Params) => {
      this.roomInformation = this.api.allRooms.find((s: Hotelroom) => {
        return s.id === +data['id'];
      });
      this.photosOfRoom = this.roomInformation?.images;
    });
  }
  onChangePhoto(id: number) {
    this.currentPhoto = id;
  }
  onNext() {
    if (this.currentPhoto >= this.photosOfRoom!.length - 1) {
      this.currentPhoto = 0;
    } else {
      this.currentPhoto++;
    }
  }
  onPrev() {
    if (this.currentPhoto === 0) {
      this.currentPhoto = this.photosOfRoom!.length - 1;
    } else {
      this.currentPhoto--;
    }
  }
  ngOnInit(): void {
    this.gettingSingleRoom();
    window.scrollTo(0, 0);
    for (let i = 0; i < 3; i++) {
      this.otherRooms.push(this.api.allRooms[i]);
    }
  }
}
