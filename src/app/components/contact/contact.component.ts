import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { HttpService } from '../../services/http.service';
import { ContactModel } from '../../models/contact.model';
import { LinkModel } from '../../models/link.model';
import { MessageModel } from '../../models/message.model';
import { EmailJsService } from '../../services/email-js.service';
import { EmailJSResponseStatus } from '@emailjs/browser';
import { LayoutModel } from '../../models/layout.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  layoutModel: LayoutModel = new LayoutModel();
  contactModel: ContactModel = new ContactModel();
  messageModel: MessageModel = new MessageModel();
  links: LinkModel[] = [];
  isMenuOpen = false;
  isScreenSizeUnder768px = false;

  contactMessage = '';

  constructor(
    private http: HttpService,
    private emailService: EmailJsService,
    private router: Router
  ) {
    this.getAllContact();
    this.getAllLink();
    this.getAllLayout();
    this.checkWindowSize();
  }

  ngOnInit(){
    AOS.init({
      duration: 2000,
      delay:200,
      once:true
    }); // AOS'u başlat
    this.initializeGsapAnimations();
    this.showSubMenu()
  }

  getAllContact(){
    this.http.get("Informations/GetAll", (res) => {
      this.contactModel = res.data[0];
      console.log(this.contactModel);
    })
  }

  getAllLayout(){
    this.http.get("Layouts/GetAll", (res) => {
      this.layoutModel = res.data[0];
    });
  }

  getAllLink(){
    this.http.get("Links/GetAll", (res) => {
      this.links = res.data;
      console.log(this.links);
      
    })
  }

  createMessage(){
    this.sendEmail();
    setTimeout(() => {
      this.http.post("Contacts/Create", this.messageModel, (res) => {
        console.log(res);
        setTimeout(() => {
          location.reload();
        },3000);
      });
    },5000);
  }

  sendEmail(){
    this.emailService.sendEmail(this.messageModel);
  }

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
      // console.log('Ekran boyutu 768px altında.');
      this.isScreenSizeUnder768px = true;
      if (contactInfo && contactForm) {
        contactInfo.removeAttribute('data-aos');
        contactForm.removeAttribute('data-aos');
      }
    } else {
      // console.log('Ekran boyutu 768px veya üzerinde.');
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
  

  initializeGsapAnimations() {
    var menuToggle = document.getElementById("menuToggle");
    var menuToggle2 = document.getElementById("menuToggle2");
    var toggleBtn = document.getElementById("toggle-btn");

    var menuBar = gsap.timeline();

    menuBar.to('.bar-1', 0.5, {
      attr: { d: "M8,2 L2,8" },
      x: 1,
      ease: Power2.easeInOut
    }, 'start')

    menuBar.to('.bar-2', 0.5, {
      autoAlpha: 0
    }, 'start')

    menuBar.to('.bar-3', 0.5, {
      attr: { d: "M8,8 L2,2" },
      x: 1,
      ease: Power2.easeInOut
    }, 'start')

    menuBar.reverse();


    var tl = gsap.timeline({ paused: true });

    tl.to('.fullpage-menu', {
      duration: 0,
      display: "block",
      ease: 'Expo.easeInOut',
    });

    tl.from('.menu-bg .span1', {
      duration: 1,
      y: "100%",  // Yukarı doğru hareket
      stagger: 0.1,
      ease: 'Expo.easeInOut'
    }, "start");

    tl.from('.menu-bg .span2', {
      duration: 1,
      y: "-100%",   // Aşağı doğru hareket
      stagger: 0.0,
      ease: 'Expo.easeInOut'
    }, "start");

    tl.from('.btn2', {
      duration: 1,
      x: "300%",
      stagger: 0.1,
      ease: 'Expo.easeInOut'
    }, "-=1.2");

    tl.from('.nav__logo h1', {
      duration: 1,
      x: "-300%",
      stagger: 0.0,
      ease: 'Expo.easeInOut'
    }, "-=0.5");

    tl.from('ul li h1', {
      duration: 1.5,
      y: "100%",
      stagger: 0.2,
      ease: 'Expo.easeInOut'
    }, "-=0.5");

    tl.from('.social-links li', {
      duration: 1,
      y: "-100%",
      opacity: 0,
      stagger: 0.1,
      ease: 'Expo.easeInOut'
    }, "-=0.3");

    tl.reverse();

    menuToggle!.addEventListener('click', function () {
      menuBar.reversed(!menuBar.reversed());
      if (menuBar.reversed()) {
        tl.timeScale(3);
        tl.reversed(!tl.reversed());
      }
      else {
        tl.timeScale(1);
      }

    });

    menuToggle2!.addEventListener('click', function () {
      menuBar.reversed(!menuBar.reversed());
      if (menuBar.reversed()) {
        tl.timeScale(2);
        tl.reversed(!tl.reversed());
      }
      else {
        tl.timeScale(1);
      }
    });

    toggleBtn!.addEventListener('click', function () {
      menuBar.reversed(!menuBar.reversed());
      if (menuBar.reversed()) {
        tl.timeScale(3);
        tl.reversed(!tl.reversed());
      }
      else {
        tl.timeScale(1);
      }
    });
  }

  showSubMenu() {
    const portfolioLink = document.querySelector('.btn-2') as HTMLElement;
    const navElement2 = document.querySelector('.nav-element-2') as HTMLElement;
    let timeoutId: any | null = null;
    if (window.innerWidth >= 768) {
      
      // Portfolio'ya hover yapıldığında
      portfolioLink.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId!); // Önceki timeout'u temizle
        navElement2.style.display = 'block';
        navElement2.style.opacity = '1'; // Hızla görünür hale getir
      });
    
      // Alt menü öğesine mouse ile gelindiğinde opaklığı koru
      navElement2.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId!); // Önceki timeout'u temizle
        navElement2.style.opacity = '1';
      });
    
      // Portfolio'dan mouse ayrıldığında
      portfolioLink.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
          navElement2.style.opacity = '0';
          setTimeout(() => {
            navElement2.style.display = 'none';
          }, 300);  // Opaklık sıfıra düştükten sonra gizle
        }, 300); // 300ms gecikme ekledik
      });
    
      // Alt menü öğesinden mouse ayrıldığında gizle
      navElement2.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
          navElement2.style.opacity = '0';
          setTimeout(() => {
            navElement2.style.display = 'none';
          }, 300);  // Opaklık sıfıra düştükten sonra gizle
        }, 300); // 300ms gecikme ekledik
      });
    }
  }
}
