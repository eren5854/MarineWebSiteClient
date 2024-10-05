import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HttpService } from '../../services/http.service';
import { PortfolioModel } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  portfolios: PortfolioModel[] = [];
  isMenuOpen = false;
  isScreenSizeUnder768px = false;

  title: string = "Portfolio";
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/portfolio.jpg")'

  constructor(
    private http: HttpService,
    private router: Router,
    private layout: LayoutComponent
  ) {
    this.getAllPortfolio();
    this.layout.setTitle(this.title, this.backgroundImage);
    
  }

  getAllPortfolio(){
    this.http.get("Portfolios/GetAll", (res) => {
      this.portfolios = res.data;
      console.log(this.portfolios);
      
    });
  }

  routerClick(url:string){
    this.router.navigate([`/portfolio/${url}`]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
