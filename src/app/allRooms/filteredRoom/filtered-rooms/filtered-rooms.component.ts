import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutingStateManegmentService } from '../../../shared/routingState/routing-state-manegment.service';

@Component({
  selector: 'app-filtered-rooms',
  templateUrl: './filtered-rooms.component.html',
  styleUrl: './filtered-rooms.component.scss',
})
export class FilteredRoomsComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private activRoute: ActivatedRoute,
    private routingState: RoutingStateManegmentService,
    private cd: ChangeDetectorRef
  ) {}
  fillterOptions: string[] = [
    'All',
    'Single Room',
    'Double Room',
    'Deluxe Room',
  ];
  currentIndexOfParems!: number;
  activetedFillterOptions!: Subscription;
  lengthOfItems!: number;
  activetedLengthOfItems!: Subscription;

  onNavigate(index: number) {
    this.route.navigate(['rooms', index]);
  }
  chanegingRouterIfItIsOnlyRooms() {
    if (this.route.routerState.snapshot.url === '/rooms') {
      this.route.navigate([0], { relativeTo: this.activRoute });
    }
  }
  changegingPageIndexWheneverWeGoToNewPage() {
    this.activetedFillterOptions =
      this.routingState.fillterOptionsChanged.subscribe((data: number) => {
        this.currentIndexOfParems = data;
        this.cd.detectChanges();
      });
  }
  gettingLengthOfIitems() {
    this.activetedLengthOfItems =
      this.routingState.gettingLengthOfRooms.subscribe((data: number) => {
        this.lengthOfItems = data;
        this.cd.detectChanges();
      });
  }
  ngOnInit(): void {
    this.chanegingRouterIfItIsOnlyRooms();
    this.changegingPageIndexWheneverWeGoToNewPage();
    this.gettingLengthOfIitems();
  }
  ngOnDestroy(): void {
    this.activetedFillterOptions.unsubscribe();
    this.activetedLengthOfItems.unsubscribe();
  }
}
