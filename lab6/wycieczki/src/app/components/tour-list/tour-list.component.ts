import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { subscribeOn, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {AddToCartService} from '../../services/add-to-cart.service';
import {StateServicerService} from '../../services/state-servicer.service';
import { TourCounterService } from 'src/app/services/tour-counter.service';
import { ShareTourDataService } from 'src/app/services/share-tour-data.service';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';




@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent {
  faCartShopping = faCartShopping;

  constructor(private httpClient: HttpClient,private route: ActivatedRoute,private service:AddToCartService,private state:StateServicerService,private statetour:TourCounterService,private shareData:ShareTourDataService,
    private firebase_service:FirebaseServiceService){
  }
  database:any=[];
  tour_counter:any=0;
  showCart_bool:boolean=false;
  last_id=11;
  hide_main=false;
  obs:any;

  retriveData(el:any){
    if(this.state.state$.getValue()==null){
      this.database=[];
      el.forEach((el:any)=>this.database.push({...el.data(),id:el.id}));
      this.database=this.database.map((obj: any) => ({ ...obj, enabled: 'true',curr_counter:obj.max_people }))
      this.state.state$.next(this.database);

    }else{
      this.database=this.state.state$.getValue();
      el.forEach((el2:any)=>{
        let in_db:boolean=false;
        this.database.forEach((element:any)=>{
          if(el2.id==element.id){
            in_db=true;
          }
        })
        if(!in_db){
          this.database.push({...el2.data(),id:el2.id});
          this.database=this.database.map((obj: any) => ({ ...obj, enabled: 'true',curr_counter:obj.max_people }));
          this.state.state$.next(this.database);
        }
      });

    }


    if(this.statetour.state$.getValue()!=null){
      this.tour_counter=this.statetour.state$.getValue()
    }



  }


  ngOnInit(){
    this.firebase_service.getData().then(data=>this.retriveData(data));
}


  updateCart(event:any){
    this.tour_counter+=(event.val*-1);
    this.database=this.database.map((obj:any)=> obj.id==event.id? { ...obj,curr_counter:event.curr } : {...obj})

    this.service.tourCounterUpdater.emit(this.tour_counter);
    this.statetour.state$.next(this.tour_counter);
    this.state.state$.next(this.database);
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
    this.service.tourCounterUpdater.emit(this.tour_counter);
    this.statetour.state$.next(this.tour_counter);
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
