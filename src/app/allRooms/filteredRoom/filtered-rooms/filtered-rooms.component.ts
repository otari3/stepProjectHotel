import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
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
  searchInject = inject(RoutingStateManegmentService);
  filteringOptionsInput = { from: '', to: '' };
  actviteListningToParemsData!: Subscription;
  activetUserResetsFilter!: Subscription;
  fillterOn = false;
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
  onAppleFilter() {
    this.route.navigate([], {
      queryParams: this.filteringOptionsInput,
    });
    this.routingState.currentQueryParems = this.filteringOptionsInput;
  }
  listetingToParemsData() {
    this.actviteListningToParemsData =
      this.routingState.gettingQueryParemsData.subscribe(
        (data: { from: string; to: string }) => {
          this.filteringOptionsInput.from = data.from;
          this.filteringOptionsInput.to = data.to;
          this.fillterOn = true;
          this.cd.detectChanges();
        }
      );
  }
  userResetsFilter() {
    this.activetUserResetsFilter =
      this.routingState.handelingIfUserResetsFilter.subscribe((data: void) => {
        this.filteringOptionsInput.from = '';
        this.filteringOptionsInput.to = '';
        this.fillterOn = false;
        this.cd.detectChanges();
      });
  }
  ngOnInit(): void {
    this.chanegingRouterIfItIsOnlyRooms();
    this.changegingPageIndexWheneverWeGoToNewPage();
    this.gettingLengthOfIitems();
    this.listetingToParemsData();
    this.userResetsFilter();
  }
  ngOnDestroy(): void {
    this.activetedFillterOptions.unsubscribe();
    this.activetedLengthOfItems.unsubscribe();
    this.actviteListningToParemsData.unsubscribe();
    this.activetUserResetsFilter.unsubscribe();
  }
}
