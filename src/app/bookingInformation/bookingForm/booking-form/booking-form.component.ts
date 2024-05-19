import { Component, Input, OnInit } from '@angular/core';
import { Hotelroom } from '../../../shared/hotelRoomInterface/hotelRoomType';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiCallsService } from '../../../shared/api/api-calls.service';
import { Router } from '@angular/router';
import { SpinerService } from '../../../shared/spiner/spiner.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements OnInit {
  constructor(
    private api: ApiCallsService,
    private route: Router,
    private spiner: SpinerService
  ) {}
  @Input() roomInfo!: Hotelroom | undefined;
  OnBookNowValidationOfFrom = false;
  totalPrice!: number;
  PhoneNumber = '5568';
  loading = false;
  bookingPost: FormGroup = new FormGroup({
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required),
    custumerName: new FormControl('', Validators.required),
  });
  submiting() {
    this.OnBookNowValidationOfFrom = true;
    if (this.totalPrice <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It Looks Like Dates Are Wrong!',
      });
    } else if (this.bookingPost.status === 'INVALID') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It Looks There Are Missing Fields!',
      });
    } else {
      this.spiner.loading();
      this.api
        .postingInBooking({
          roomID: this.roomInfo?.id,
          checkInDate: this.bookingPost.get('checkIn')?.value,
          checkOutDate: this.bookingPost.get('checkOut')?.value,
          totalPrice: this.totalPrice,
          isConfirmed: true,
          customerName: this.bookingPost.get('custumerName')?.value,
          customerPhone: this.PhoneNumber,
        })
        .subscribe({
          next: (v: any) => {
            setTimeout(() => {
              this.spiner.finishedLoadin();
              Swal.fire({
                title: 'Your Dates Has Been Booked',
                text: 'Do You Want To See Your Booked Room',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
              }).then((res) => {
                if (res.isConfirmed) {
                  let number = parseInt(v.match(/\d+/)[0]);
                  this.route.navigate(['allbookroom', number]);
                }
              });
            }, 200);
          },
          error: (e) => {
            this.spiner.finishedLoadin();
            if (e.status === 500) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'It Looks Like There Is Server Error!',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'It Looks Like This Date Has Been Booked!',
              });
            }
          },
        });
    }
  }
  onDateCheckInChekOut() {
    let checkInDate = this.bookingPost.get('checkIn')?.value;
    let checkOutDate = this.bookingPost.get('checkOut')?.value;
    if (checkInDate !== '' && checkOutDate !== '') {
      this.totalPrice = this.calculateTotalPrice(
        this.roomInfo!.pricePerNight,
        checkInDate,
        checkOutDate
      );
    }
  }
  getNumberOfNights(checkInDate: string, checkOutDate: string) {
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate: any = new Date(checkInDate);
    const endDate: any = new Date(checkOutDate);
    let currentDate = new Date();
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    if (endDate < startDate) {
      return 0;
    }
    if (startDate < currentDate) {
      return 0;
    }
    return diffDays;
  }
  calculateTotalPrice(
    pricePerNight: number,
    checkInDate: string,
    checkOutDate: string
  ) {
    const numberOfNights = this.getNumberOfNights(checkInDate, checkOutDate);
    const totalPrice = numberOfNights * pricePerNight;
    return totalPrice;
  }
  ngOnInit(): void {
    this.spiner.ifLoading.subscribe((data: boolean) => {
      this.loading = data;
    });
  }
}
