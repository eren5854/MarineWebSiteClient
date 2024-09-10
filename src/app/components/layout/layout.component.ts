import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [IonIcon, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isMenuOpen = false;
  isScreenSizeUnder768px = false;
  isNavigateOpen = false;
  private scrollHandler: () => void;

  constructor() {
    this.scrollHandler = this.scrollActive.bind(this);
    this.checkWindowSize();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('open', this.isMenuOpen);
    }
  }

  scrollActive = (): void => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const scrollY = window.pageYOffset;
  
    sections.forEach(current => {
      const sectionHeight = (current as HTMLElement).offsetHeight;
      const sectionTop = (current as HTMLElement).offsetTop - 700; // Navigasyon yüksekliğinize göre ayarlayın
      const sectionId = (current as HTMLElement).getAttribute('id') || '';
  
      const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          (link as HTMLElement).classList.add('active-link');
        } else {
          (link as HTMLElement).classList.remove('active-link');
        }
      }
    });
  }

  navigateOpen(){
    this.isNavigateOpen = !this.isNavigateOpen;
  }
}
