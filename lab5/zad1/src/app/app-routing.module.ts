import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainSiteComponent } from './components/main-site/main-site.component';
import { OnePhotoComponent } from './components/one-photo/one-photo.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {path:'photos',component:PhotosComponent},
  {path: 'photos/:id', component: OnePhotoComponent},
  {path: 'posts', component:PostsComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
