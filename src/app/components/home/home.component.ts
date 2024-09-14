import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isScreenSizeUnder768px = false;

  constructor() {
    this.checkWindowSize();
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
