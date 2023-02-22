import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-one-photo',
  templateUrl: './one-photo.component.html',
  styleUrls: ['./one-photo.component.css']
})
export class OnePhotoComponent {
  constructor(private route: ActivatedRoute,private http: HttpClient){
  }
  photoUrl:string="https://jsonplaceholder.typicode.com/photos/";
  id:any;
  data:any;
  private subscription: Subscription | undefined;
  ngOnInit(){
    this.subscription=this.route.params.subscribe(params =>{
      this.id=params['id'];
    });
    this.photoUrl+=this.id;
    this.http.get<any>(this.photoUrl)
      .subscribe(data => {
        this.data=data.thumbnailUrl;
      });

  }


}
