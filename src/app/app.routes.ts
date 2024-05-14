import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { GaleryComponent } from './galery/galery.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ContactAreaComponent } from './contact-area/contact-area.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { CarritoDetailsComponent } from './carrito-details/carrito-details.component';
import { PayMethodComponent } from './pay-method/pay-method.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { MyAssessmentsComponent } from './my-assessments/my-assessments.component';

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
        path: 'admin_area',
        component: AdminAreaComponent
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
        path: 'contact-area',
        component: ContactAreaComponent
    },
    {
        path: 'assessment/:id',
        component: AssessmentComponent
    },
    {
        path: 'my-orders',
        component: MyOrdersComponent
    },
    {
        path: 'assessments',
        component: AssessmentComponent
    },
    {
        path: 'my-assessments',
        component: MyAssessmentsComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'carrito-details',
        component: CarritoDetailsComponent
    },
    {
        path: 'pay-method',
        component: PayMethodComponent
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
