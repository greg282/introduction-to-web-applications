import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() info_type:string="";
  @Input() info_text:string="";
  @Input() info_id:string="";

  info_array=[

    {id:"basics",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia maxime expedita doloremque eaque a aut sapiente magnam neque omnis modi."},
    {id:"components",desc:"Officia maxime expedita doloremque eaque a aut sapiente magnam neque omnis modi."},
    {id:"events",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.eaque a aut sapiente magnam neque omnis modi."}
  ]


  onClick(event: any):void{
    event.stopPropagation();
    for(let i=0;i<this.info_array.length;i++){
      if(this.info_array[i].id==event.target.id){
       this.notifyParent.emit(this.info_array[i]);
        break;
      }
    }
  }
}
