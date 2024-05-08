import { Component, Input, Renderer2 } from '@angular/core';
import { Hotelroom } from '../../shared/hotelRoomInterface/hotelRoomType';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrl: './single-room.component.scss',
})
export class SingleRoomComponent {
  constructor(
    private rend: Renderer2,
    private route: Router,
    private routerState: RoutingStateManegmentService,
    private activtedRouter: ActivatedRoute
  ) {}
  @Input() room!: Hotelroom;
  removeingHiddingClass(htmlElement: HTMLElement) {
    this.rend.removeClass(htmlElement, 'hidding');
  }
  addingHiddingClass(htmlElement: HTMLElement) {
    this.rend.addClass(htmlElement, 'hidding');
  }
  onBookRoom(type: number, id: number) {
    let ifBookRoomsPage = this.route.routerState.snapshot.url;
    if (!ifBookRoomsPage.match('bookroom')) {
      let currentRoute = this.route.url.split('?')[0];
      let currentQueryParems = this.activtedRouter.snapshot.queryParams;
      this.routerState.currentQueryParems = currentQueryParems;
      this.routerState.previus = currentRoute;
    }
    this.route.navigate(['bookroom', type, id]);
  }
}
