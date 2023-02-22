import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/photos';

  public data:any;

  constructor(private http: HttpClient){
      this.loadData();
  }

  loadData() {
    this.http.get<any[]>(this.API_URL)
      .subscribe(data => {
        console.log(data);
        this.data=data;
      });
  }


}
