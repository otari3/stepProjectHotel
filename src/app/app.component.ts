import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingStateManegmentService } from './shared/routingState/routing-state-manegment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private activetedRoute: ActivatedRoute,
    private handelingState: RoutingStateManegmentService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((data: any) => {
      let currentRoute = this.route.routerState.snapshot.url;
      if (Object.keys(data).length === 0 && !currentRoute.match('/bookroom')) {
        this.handelingState.currentQueryParems = null;
      } else if (Object.keys(data).length > 1) {
        this.handelingState.currentQueryParems = data;
      }
    });
  }
}
