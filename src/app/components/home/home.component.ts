import { CommonModule } from '@angular/common';
import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { LayoutComponent } from '../layout/layout.component';
import { HttpService } from '../../services/http.service';
import { HomeModel } from '../../models/home.model';
import { HomeImageModel } from '../../models/homeImage.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  homeModel: HomeModel = new HomeModel();
  homeImages: HomeImageModel[] = [];
  isScreenSizeUnder768px = false;

  title: string = "Slogan Alanı"
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/home.jpg")'

  constructor(
    private http: HttpService,
    private layout: LayoutComponent
  ) {
    this.getAllHome();
    this.getAllHomeImage();
    this.checkWindowSize();
    this.layout.setTitle(this.title, this.backgroundImage);
    // AOS.init({
    //   duration: 2000,
    //   delay: 200,
    //   once: false
    // }); // AOS'u başlat
  }

  getAllHome(){
    this.http.get("Homes/GetAll", (res) => {
      this.homeModel = res.data[0];
      console.log(this.homeModel);
    });
  }

  getAllHomeImage(){
    this.http.get("HomeImages/GetAll", (res) => {
      this.homeImages = res.data;
      console.log(this.homeImages);
    });
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
