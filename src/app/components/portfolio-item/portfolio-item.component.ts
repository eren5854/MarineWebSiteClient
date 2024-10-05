import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HttpService } from '../../services/http.service';
import { PortfolioModel } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.css'
})
export class PortfolioItemComponent {
  title: string = "";
  id?: string;
  portfolioModel: PortfolioModel = new PortfolioModel();
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/yacht-5.jpg")'
  
  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
    private layout: LayoutComponent
  ){
    this.activated.params.subscribe((res:any) => {
      this.id = res.id;
      console.log(res.id);
    });
    this.getById(this.id);
    this.layout.setTitle(this.title, this.backgroundImage);
  }

  getById(id:any){
    this.http.get(`Portfolios/GetById?Id=${id}`, (res) => {
      this.portfolioModel = res.data;
      console.log(this.portfolioModel);
      this.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("https://marqex.webapi.marqexmarine.com/Images/${this.portfolioModel.image}")`
      this.layout.setTitle(this.portfolioModel.title, this.backgroundImage);
    })
  }
}
