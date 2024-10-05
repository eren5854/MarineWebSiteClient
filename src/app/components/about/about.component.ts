import { Component, ElementRef, HostListener, ViewChild,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { LayoutComponent } from '../layout/layout.component';
import { HttpService } from '../../services/http.service';
import { AboutModel } from '../../models/about.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonList, CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent {
  abouts: AboutModel[] = [];
  isMenuOpen = false;
  isScreenSizeUnder768px = false;
  isNavigateOpen = false;

  title:string = "";
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),url("/assets/about-top.jpg")'
  
  private scrollHandler: () => void;

  constructor(
    private http: HttpService,
    private layout: LayoutComponent,
    private sanitizer: DomSanitizer
  ) {
    this.getAllAbout();
    this.scrollHandler = this.scrollActive.bind(this);
    this.checkWindowSize();
    this.layout.setTitle(this.title, this.backgroundImage);
  }

  getAllAbout(){
    this.http.get("Abouts/GetAll", (res) => {
      this.abouts = res.data.map((about: AboutModel) => {
        return { ...about, text: this.getSafeHtml(about.text) };
      });
    });
  }

  getSafeHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  ngOnInit(){
    window.addEventListener('scroll', this.scrollHandler);
  }

  // ngOnInit(): void {
  // }

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
      const sectionTop = (current as HTMLElement).offsetTop - 700; 
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
