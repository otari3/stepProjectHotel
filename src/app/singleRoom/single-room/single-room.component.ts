import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Hotelroom } from '../../shared/hotelRoomInterface/hotelRoomType';
import { Router } from '@angular/router';
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
    private routerState: RoutingStateManegmentService
  ) {}
  @Input() room!: Hotelroom;
  removeingHiddingClass(htmlElement: HTMLElement) {
    this.rend.removeClass(htmlElement, 'hidding');
  }
  addingHiddingClass(htmlElement: HTMLElement) {
    this.rend.addClass(htmlElement, 'hidding');
  }
  onBookRoom() {
    this.routerState.previus = this.route.routerState.snapshot.url;
    this.route.navigate(['bookroom']);
  }
}
