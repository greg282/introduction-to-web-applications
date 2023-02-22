import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {AddToCartService} from '../../services/add-to-cart.service'


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Output() updateLocalDatabase: EventEmitter<any> = new EventEmitter();
  @Output() disableCurrItem: EventEmitter<any> = new EventEmitter();
  @Output() enableCurrItem: EventEmitter<any> = new EventEmitter();


  @Input() name:any;
  @Input() country_of_dest:any;
  @Input() start_date:any;
  @Input() end_date:any;
  @Input() unit_price:any;
  @Input() max_people:any;
  @Input() description:any;
  @Input() photo_src:any;
  @Input() id:any;
  @ViewChild('plusbutton') add_handle:any;
  @ViewChild('rmbutton') rm_handle:any;
  enabled=true;
  curr_state:any;
  max_price:boolean=false;
  min_price:boolean=false;
  review_buttons_enabled:boolean=false;
  reviews:number[]=[];
  avg_review:any="Brak";

  constructor(private service:AddToCartService) {
  }

  ngOnInit(){
    this.curr_state=this.max_people;
  }
  ngAfterViewInit(){
    this.state_service();
  }

  check_enabled_disabled(){
    if(this.curr_state==0){
      this.disableCurrItem.emit(this.id);
      this.enabled=false;
    }else if(this.curr_state!=0 && this.enabled==false){
      this.enableCurrItem.emit(this.id);
      this.enabled=true;
    }
  }

  state_service(){
    this.check_enabled_disabled();
    if(this.curr_state==this.max_people){
      this.rm_handle.nativeElement.style.display='none';
      this.rm_handle.enabled=false;
      this.add_handle.enabled=true;
      this.add_handle.nativeElement.style.display='';

    }
    else{
      this.rm_handle.nativeElement.style.display='';
      this.rm_handle.enabled=true;
      if(this.curr_state==0){
        this.add_handle.nativeElement.style.display='none';
        this.add_handle.enabled=false;
      }else{
        this.add_handle.nativeElement.style.display='';
        this.add_handle.enabled=true;
      }
    }
  }



  add_click(){
    if(this.add_handle.enabled){
      this.curr_state-=1;
      this.notifyParent.emit(-1);
    }
   this.state_service();
   this.service.tourAdded.emit({
    'name':this.name,
    'country':this.country_of_dest,
    'price':this.unit_price,
    'id':this.id,
    'counter':1
   });
  }
  rm_click(){
   if(this.rm_handle.enabled){
      this.curr_state+=1;
      this.notifyParent.emit(1);
   }
    this.state_service();
    this.service.tourReturned.emit({
      'name':this.name,
      'country':this.country_of_dest,
      'price':this.unit_price,
      'id':this.id,
      'counter':-1
     });
  }

  removeTour(event:any){
    this.service.tourReturned.emit({
      'name':this.name,
      'country':this.country_of_dest,
      'price':this.unit_price,
      'id':this.id,
      'counter':(this.max_people-this.curr_state)*-1
     });
    this.updateLocalDatabase.emit({ "id":this.id,"todel": this.max_people-this.curr_state});
    event.target.parentNode.parentNode.remove();
  }

  onReview(){
    this.review_buttons_enabled=!this.review_buttons_enabled;
  }
  onUpdateReview(event:any){
    this.reviews.push(event);
    this.update_avg_review();
    this.onReview();
  }

  update_avg_review(){
    let tmp=0;
    for(let i in this.reviews){
      tmp+=this.reviews[i];
    }
    this.avg_review=tmp/this.reviews.length;
    this.avg_review=this.avg_review.toPrecision(2);
  }
}
