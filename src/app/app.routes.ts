import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

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
            }
        ]
    },
    {
        path: "contact",
        component: ContactComponent
    }
];
