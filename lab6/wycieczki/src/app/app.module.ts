import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TourComponent } from './components/tour/tour.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { StarReviewComponent } from './components/star-review/star-review.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { SingletourComponent } from './components/singletour/singletour.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { StatePersistenceComponent } from './components/state-persistence/state-persistence.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { TripmanagerComponent } from './components/tripmanager/tripmanager.component'


@NgModule({
  declarations: [
    AppComponent,
    TourListComponent,
    TourComponent,
    FormComponent,
    StarReviewComponent,
    ShopCartComponent,
    NavMenuComponent,
    MainpageComponent,
    SingletourComponent,
    CartViewComponent,
    LoginComponent,
    RegisterComponent,
    StatePersistenceComponent,
    AdminViewComponent,
    TripmanagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
