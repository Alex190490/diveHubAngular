import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },  
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',                            // ejemplo: http://localhost:4200/nijcwncpwcmwo 
        redirectTo: 'not-found'
    }
];


//EL ORDEN ES MUY IMPORTANTE
