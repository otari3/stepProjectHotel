import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent implements OnInit {
  constructor(private api: ApiCallsService) {}
  allHotels: any;
  ngOnInit(): void {
    if (!this.api.allHotels) {
      this.api.gettingHotels().subscribe((data: any) => {
        this.api.allHotels = data;
        this.allHotels = this.api.allHotels;
      });
    } else {
      this.allHotels = this.api.allHotels;
    }
  }
}
