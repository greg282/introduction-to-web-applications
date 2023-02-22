import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { subscribeOn, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent {

  constructor(private httpClient: HttpClient,private route: ActivatedRoute){

  }
  database:any;
  tour_counter:any=0;
  showCart_bool:boolean=false;
  last_id=11;
  hide_main=false;

  ngOnInit(){
    this.httpClient.get("assets/tours.json").subscribe(data =>{
      this.database=data;
      this.database=this.database.tours;
      this.database=this.database.map((obj: any) => ({ ...obj, enabled: 'true' }))
  });

}

  ngAfterViewInit(){

  }

  updateCart(event:any){
    this.tour_counter+=(event*-1);
  }

  getmaxprice(){
    let tmp:any=0;
    for(let item in this.database){
      if(this.database[item].unit_price>tmp && this.database[item].enabled){
        tmp=this.database[item].unit_price;
      }
    }
    return tmp;
  }
  getminprice(){
    let tmp:any=Infinity;
    for(let item in this.database){
      if(this.database[item].unit_price<tmp && this.database[item].enabled ){
        tmp=this.database[item].unit_price;
      }
    }
    return tmp;
  }

  rmById(event:any){
    this.tour_counter-=event.todel;
    this.database=this.database.filter((item: { id: any; }) => item.id!=event.id);
  }

  setEnabledByID(id:any){
   for(let item in this.database){
      if(this.database[item].id==id){
        this.database[item].enabled=true;
      }
   }
  }

  setDisabledByID(id:any){
    for(let item in this.database){
      if(this.database[item].id==id){
        this.database[item].enabled=false;
      }
   }
  }

  pushData(event:any){
    this.hideData();
    event=event.sended_form;
    if(event==undefined){
      return;
    }
    event.id=this.last_id+1;
    this.last_id++;
    event.enabled=true;
    this.database.push(event);
  }

  showCart(){
    this.showCart_bool=!this.showCart_bool;
  }

  hideData(){
      this.hide_main=!this.hide_main;
  }
}
