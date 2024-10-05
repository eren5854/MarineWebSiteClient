import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioItemComponent } from './components/portfolio-item/portfolio-item.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children:[
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "portfolio",
                component: PortfolioComponent
            },
            {
                path: "about",
                component: AboutComponent
            },
            {
                path: "portfolio/:id",
                component: PortfolioItemComponent
            }
        ]
    },
    {
        path: "contact",
        component: ContactComponent
    }
];
