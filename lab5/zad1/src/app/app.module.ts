import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { PhotosComponent } from './components/photos/photos.component';
import { HttpClientModule } from '@angular/common/http';
import { OnePhotoComponent } from './components/one-photo/one-photo.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostsComponent } from './components/posts/posts.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MainSiteComponent,
    PhotosComponent,
    OnePhotoComponent,
    HomePageComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
