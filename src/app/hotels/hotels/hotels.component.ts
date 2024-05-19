import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { SpinerService } from '../../shared/spiner/spiner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent implements OnInit, OnDestroy {
  constructor(private api: ApiCallsService, private spiner: SpinerService) {}
  allHotels: any;
  stopingHotleGetWhenDestroyed!: Subscription;
  ngOnInit(): void {
    this.spiner.loadingScrollBar();
    if (!this.api.allHotels) {
      this.stopingHotleGetWhenDestroyed = this.api
        .gettingHotels()
        .subscribe((data: any) => {
          this.api.allHotels = data;
          this.allHotels = this.api.allHotels;
          this.spiner.finishedLoadingScrollBar();
        });
    } else {
      this.allHotels = this.api.allHotels;
      this.spiner.finishedLoadingScrollBar();
    }
  }
  ngOnDestroy(): void {
    if (this.stopingHotleGetWhenDestroyed) {
      this.stopingHotleGetWhenDestroyed.unsubscribe();
    }
  }
}
