import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  text:string="";
  type:string="";

  onNotify(event:any){
    this.text=event.desc;
    this.type=event.id;
  }
}
