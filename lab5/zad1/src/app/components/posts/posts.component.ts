import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';
  curr_id=101;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8 ',

    })
  };

  newPostForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
  })
  data:any;

  constructor(private http: HttpClient){
    this.loadData();
  }

loadData() {
  this.http.get<any[]>(this.API_URL)
    .subscribe(data => {
      this.data=data;
      console.log(data);
    });
}

sendData(){
    let obj={
      "userId":this.curr_id,
      "id":this.curr_id,
      "title":this.newPostForm.get('title')?.value,
      "body": this.newPostForm.get('text')?.value
    }
    this.curr_id+=1;
    console.log(JSON.stringify(obj));
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts',JSON.stringify(obj),this.httpOptions).subscribe(res =>
    this.data.splice(0,0,obj));
}
}
