import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinerService {
  ifLoading = new Subject<boolean>();
  loading() {
    this.ifLoading.next(true);
  }
  finishedLoadin() {
    this.ifLoading.next(false);
  }
  constructor() {}
}
