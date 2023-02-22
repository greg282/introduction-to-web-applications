import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { FormComponent } from './components/form/form.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { SingletourComponent } from './components/singletour/singletour.component';
import { TourListComponent } from './components/tour-list/tour-list.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'cart', component: CartViewComponent },
  {path:'tourlist/:id', component:SingletourComponent},
  { path: 'tourlist', component: TourListComponent },
  {path:'home',component:MainpageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
