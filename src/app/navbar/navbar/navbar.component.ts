import { Component, OnInit } from '@angular/core';
import { RoutingStateManegmentService } from '../../shared/routingState/routing-state-manegment.service';
import { SpinerService } from '../../shared/spiner/spiner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private spiner: SpinerService) {}
  scrollBarLength = 0;
  loading = false;
  scrollBarLengthInterval: any;
  addingToScrollBarLength() {
    this.scrollBarLengthInterval = setInterval(() => {
      if (this.scrollBarLength < 80) {
        this.scrollBarLength += 10;
      }
    }, 150);
  }
  ngOnInit(): void {
    this.spiner.scrollBar.subscribe((data: boolean) => {
      if (data) {
        this.loading = data;
        this.addingToScrollBarLength();
      } else if (!data) {
        this.loading = data;
        clearInterval(this.scrollBarLengthInterval);
        this.scrollBarLength = 0;
      }
    });
  }
}
