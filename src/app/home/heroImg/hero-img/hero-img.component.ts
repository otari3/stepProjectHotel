import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-img',
  templateUrl: './hero-img.component.html',
  styleUrl: './hero-img.component.scss',
})
export class HeroImgComponent {
  constructor(private route: Router) {}
}
