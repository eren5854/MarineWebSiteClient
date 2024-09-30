import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-item.component.html',
  styleUrl: './portfolio-item.component.css'
})
export class PortfolioItemComponent {
  title: string = "";
  backgroundImage: string = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/assets/yacht-5.jpg")'
  
  constructor(
    private activated: ActivatedRoute,
    private layout: LayoutComponent
  ){
    
    this.activated.params.subscribe((res:any) => {
      this.title = res.title;
      console.log(res.title);
    });
    
    this.layout.setTitle(this.title, this.backgroundImage);
  }
}
