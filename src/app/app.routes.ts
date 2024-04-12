import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { GaleryComponent } from './galery/galery.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';

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
        path: 'product-details/:id',
        component: ProductDetailComponent
    },
    {
        path: 'like',
        component: WishListComponent
    },
    {
        path: 'galery',
        component: GaleryComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'register',
        component: RegisterComponent
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
