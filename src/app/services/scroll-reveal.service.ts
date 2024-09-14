import { Injectable } from '@angular/core';
import { NgsRevealModule, NgsRevealService } from 'ngx-scrollreveal';

@Injectable({
  providedIn: 'root'
})
export class ScrollRevealService {

  constructor(
    private scrollReveal: NgsRevealService
  ) { }

  // init(): void {
  //   ScrollReveal().reveal('.reveal-bottom-1', {
  //     origin: 'bottom',
  //     distance: '250px',
  //     duration: 1500,
  //     easing: 'ease-out',
  //     reset: false
  //   });
}
