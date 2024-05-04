import { Component, Input } from '@angular/core';
import { Hotelroom } from '../../../shared/hotelRoomInterface/hotelRoomType';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent {
  constructor() {}
  @Input() roomInfo!: Hotelroom | undefined;
  OnBookNowValidationOfFrom = false;
  totalPrice!: number;
  bookingPost: FormGroup = new FormGroup({
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required),
    custumerName: new FormControl('', Validators.required),
  });
  submiting() {
    this.OnBookNowValidationOfFrom = true;
    console.log(this.bookingPost);
  }
  onDateCheckInChekOut() {
    let checkInDate = this.bookingPost.get('checkIn')?.value;
    let checkOutDate = this.bookingPost.get('checkOut')?.value;
    if (checkInDate !== '' && checkOutDate !== '') {
    }
  }
  getDayFromDate(inputDate: string) {
    let dateObject = new Date(inputDate);
    let day = dateObject.getDate();
    return day;
  }
}
