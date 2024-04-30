import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { Hotelroom } from '../../shared/hotelRoomInterface/hotelRoomType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private api: ApiCallsService) {}
}
