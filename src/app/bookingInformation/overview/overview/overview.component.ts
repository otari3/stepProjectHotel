import { Component, Input } from '@angular/core';
import { Hotelroom } from '../../../shared/hotelRoomInterface/hotelRoomType';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  overViewOptions = ['Overview', 'Facillites', 'Extra'];
  optionsSwitch = 'Overview';
  @Input() otherRooms!: Hotelroom[];
  onViewOptions(name: string) {
    this.optionsSwitch = name;
  }
}
