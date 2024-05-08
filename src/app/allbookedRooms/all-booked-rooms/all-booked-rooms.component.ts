import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BookedRoomType } from '../../shared/hotelRoomInterface/hotelRoomType';
import { ApiCallsService } from '../../shared/api/api-calls.service';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-booked-rooms',
  templateUrl: './all-booked-rooms.component.html',
  styleUrl: './all-booked-rooms.component.scss',
})
export class AllBookedRoomsComponent implements OnInit, AfterViewChecked {
  constructor(
    private api: ApiCallsService,
    private activeRoute: ActivatedRoute
  ) {}
  bookedRooms!: BookedRoomType[];
  justBooked!: number;
  elementIsScrolled: boolean = false;
  PhoneNumber = '5568';
  @ViewChildren('booked') booked!: QueryList<ElementRef>;
  deleting(id: number, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.isConfirmed) {
        this.api.deletingFromBooking(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Room Deleted',
              icon: 'success',
            });
            this.bookedRooms.splice(index, 1);
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          },
        });
      }
    });
  }
  ngOnInit(): void {
    this.api.gettingBookedRooms().subscribe((data: BookedRoomType[]) => {
      this.bookedRooms = data.filter((items: BookedRoomType) => {
        return items.customerPhone === this.PhoneNumber || items.id === 15;
      });
    });
    this.activeRoute.params.subscribe((data: Params) => {
      this.justBooked = +data['id'];
    });
  }
  ngAfterViewChecked(): void {
    if (!this.elementIsScrolled) {
      this.booked.forEach((items) => {
        if (items.nativeElement.classList.contains('table-info')) {
          let rect = items.nativeElement.getBoundingClientRect();
          this.elementIsScrolled = true;
          setTimeout(() => {
            window.scrollTo(0, rect.y - 100);
          }, 200);
        }
      });
    }
  }
}
