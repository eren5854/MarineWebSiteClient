import { CommonModule } from '@angular/common';
import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { LayoutComponent } from '../layout/layout.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isScreenSizeUnder768px = false;

  title: string = "Marqex"
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/home.jpg")'

  constructor(
    private layout: LayoutComponent
  ) {
    this.checkWindowSize();
    this.layout.setTitle(this.title, this.backgroundImage);
    // AOS.init({
    //   duration: 2000,
    //   delay: 200,
    //   once: false
    // }); // AOS'u başlat
  }

  ngOnInit() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth < 768) {
      this.isScreenSizeUnder768px = true
    } else {
      this.isScreenSizeUnder768px = false;
    }
  }
}
