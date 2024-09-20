import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  isMenuOpen = false;
  isScreenSizeUnder768px = false;

  title: string = "Portfolio";
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/portfolio.jpg")'

  constructor(
    private router: Router,
    private layout: LayoutComponent
  ) {
    this.checkWindowSize();
    this.layout.setTitle(this.title, this.backgroundImage);
    // AOS.init({
    //   duration: 2000,
    //   delay: 200,
    //   once: false
    // }); // AOS'u başlat
    // AOS.refreshHard();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth < 768) {
      console.log('Ekran boyutu 768px altında.');
      this.isScreenSizeUnder768px = true;
    } else {
      console.log('Ekran boyutu 768px veya üzerinde.');
      this.isScreenSizeUnder768px = false;
    }
  }
}
