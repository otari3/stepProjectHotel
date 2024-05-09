import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinerService {
  ifLoading = new Subject<boolean>();
  scrollBar = new Subject<boolean>();
  loading() {
    this.ifLoading.next(true);
  }
  finishedLoadin() {
    this.ifLoading.next(false);
  }
  loadingScrollBar() {
    this.scrollBar.next(true);
  }
  finishedLoadingScrollBar() {
    this.scrollBar.next(false);
  }
  constructor() {}
}
