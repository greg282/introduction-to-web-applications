import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { SingletourComponent } from './components/singletour/singletour.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginAuth } from './guard/loginauth.guard';
import { GuestauthGuard } from './guard/guestauth.guard';
import { AdminGuard } from './guard/adminguard.guard';
import { StarReviewComponent } from './components/star-review/star-review.component';
import { StatePersistenceComponent } from './components/state-persistence/state-persistence.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { TripmanagerComponent } from './components/tripmanager/tripmanager.component';
const routes: Routes = [
  {path:'tripmanager',component:TripmanagerComponent,canActivate:[AuthGuard,AdminGuard]},
  { path: 'cart', component: CartViewComponent,canActivate:[AuthGuard] },
  {path:'tourlist/:id', component:SingletourComponent,canActivate:[GuestauthGuard]},
  { path: 'tourlist', component: TourListComponent },
  {path:'home',component:MainpageComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginAuth] },
  {path:'register',component:RegisterComponent,canActivate:[LoginAuth]},
  {path:'adminview',component:AdminViewComponent,canActivate:[AuthGuard,AdminGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo:'/home',pathMatch:'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
