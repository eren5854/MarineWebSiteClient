import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isMenuOpen = false;
  isScreenSizeUnder768px = false;

  constructor(
    private router: Router
  ) {
    this.checkWindowSize();
  }

  ngOnInit(){
    AOS.init({
      duration: 2000,
      delay:200,
      once:true
    }); // AOS'u başlat
    

  }

  // ngOnInit(): void {
  // }

  ngOnDestroy(): void {
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    const contactInfo = document.querySelector('.contactInfo');
    const contactForm = document.querySelector('.contactForm');
    if (window.innerWidth < 768) {
      console.log('Ekran boyutu 768px altında.');
      this.isScreenSizeUnder768px = true;
      if (contactInfo && contactForm) {
        contactInfo.removeAttribute('data-aos');
        contactForm.removeAttribute('data-aos');
      }
    } else {
      console.log('Ekran boyutu 768px veya üzerinde.');
      this.isScreenSizeUnder768px = false;
      if (contactInfo && contactForm) {
        contactInfo.setAttribute('data-aos', 'fade-left');
        contactForm.setAttribute('data-aos', 'fade-left');
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('open', this.isMenuOpen);
    }
  }

}
