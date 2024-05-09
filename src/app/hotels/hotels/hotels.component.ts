import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { SpinerService } from '../../shared/spiner/spiner.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent implements OnInit {
  constructor(private api: ApiCallsService, private spiner: SpinerService) {}
  allHotels: any;
  ngOnInit(): void {
    this.spiner.loadingScrollBar();
    if (!this.api.allHotels) {
      this.api.gettingHotels().subscribe((data: any) => {
        this.api.allHotels = data;
        this.allHotels = this.api.allHotels;
        this.spiner.finishedLoadingScrollBar();
      });
    } else {
      this.allHotels = this.api.allHotels;
      this.spiner.finishedLoadingScrollBar();
    }
  }
}
