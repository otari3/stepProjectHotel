import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { SpinerService } from './shared/spiner/spiner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private route: Router, private spiner: SpinerService) {}
  isScrolled: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY;
  }
  onScrollUp() {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.spiner.scrollBar.next(false);
      }
    });
  }
}
