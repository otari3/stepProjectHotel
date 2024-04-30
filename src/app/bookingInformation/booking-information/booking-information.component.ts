import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrl: './booking-information.component.scss',
})
export class BookingInformationComponent {
  constructor(
    private route: Router,
    private routeStateManegment: RoutingStateManegmentService
  ) {}
  onGoBack() {
    if (this.routeStateManegment.currentQueryParems) {
      this.route.navigate(['rooms', this.routeStateManegment.currentPage], {
        queryParams: this.routeStateManegment.currentQueryParems,
      });
    } else if (!this.routeStateManegment.currentQueryParems) {
      this.route.navigate([this.routeStateManegment.previus]);
    }
  }
}
