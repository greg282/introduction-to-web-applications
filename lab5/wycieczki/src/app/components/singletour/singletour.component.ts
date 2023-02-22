import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareTourDataService } from 'src/app/services/share-tour-data.service';
import { Router } from '@angular/router';
import {StateServicerService} from '../../services/state-servicer.service';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import {AddToCartService} from '../../services/add-to-cart.service'
import { TourCounterService } from 'src/app/services/tour-counter.service';
@Component({
  selector: 'app-singletour',
  templateUrl: './singletour.component.html',
  styleUrls: ['./singletour.component.css']
})
export class SingletourComponent {

  max_people:any;
  item:any={};
  id:any;
  myForm:any;
  local_rating:any=null;
  enabled:boolean=true;
  tour_counter:any=0;

  data:any=[];

  constructor(private statetour:TourCounterService,private service:AddToCartService,private route: ActivatedRoute,private shareData:ShareTourDataService,private router:Router,private state:StateServicerService,private fire:FirebaseServiceService) {

  }



  setState(data:any){
    this.item=data.data();
    this.item={...this.item,curr_counter:this.item.max_people}
    this.max_people=this.item.max_people;
  }

  ngOnInit(){
    if(this.statetour.state$.getValue()!=null){
      this.tour_counter=this.statetour.state$.getValue()
    }
    this.route.params.subscribe(params => {
      if(this.state.state$.getValue()!=null){
        this.id=params['id'];
        this.item=this.state.state$.getValue().filter((obj: { id: any; }) => obj.id==this.id);
        this.item=this.item[0];
      }
      else{
        this.id=params['id'];
        this.fire.getSingleTour(params['id']).then(data=>this.setState(data));
      }
      this.fire.getReviewsByID(params['id']).then(el=>el.forEach(d=>this.data.push({...d.data(),ndata:d.data()['date'] != null ? d.data()['date'].toDate() : ''})));
   });
   this.myForm= new FormGroup({
    nick: new FormControl<String|null>(null,[
      Validators.required,
    ]),
    description: new FormControl<String|null>(null,[
      Validators.required,
    ]),
    date: new FormControl<Date | null>(null,[
    ]),
  })
  }

  submit(){
    if(this.myForm.valid && this.local_rating!=null){
      if(this.myForm.value.data==undefined){
        this.myForm.value.data='';
      }
      this.data.push({...this.myForm.value,rating:this.local_rating});
      this.fire.uploadReview({...this.myForm.value,rating:this.local_rating},this.id)

      this.myForm.reset();
    }
    else{
      alert("Form not valid !")
    }
  }

  getStarData(rating:any){
    this.local_rating=rating;
  }
  updateCart(event:any){
    this.tour_counter+=(event.val*-1);
    if(this.state.state$.getValue()!=null){
      this.state.state$.next(this.state.state$.getValue().map((obj:any)=> obj.id==event.id? { ...obj,curr_counter:event.curr } : {...obj}));
    }
    else{
      this.fire.getData().then(data=>this.retriveData(data,event));

    }
    this.service.tourCounterUpdater.emit(this.tour_counter);
    this.statetour.state$.next(this.tour_counter);
  }

  retriveData(el2:any,event:any){
      let database: any[]=[];
      el2.forEach((el:any)=>database.push({...el.data(),id:el.id}));
      database=database.map((obj: any) => ({ ...obj, enabled: 'true',curr_counter:obj.max_people }))
      this.state.state$.next(database);
      this.state.state$.next(this.state.state$.getValue().map((obj:any)=> obj.id==event.id? { ...obj,curr_counter:event.curr } : {...obj}));
  }

  delFromDB(event:any){
    console.log(this.id);
    this.fire.deleteByID(this.id);
    this.router.navigate(['tourlist']);
    this.state.state$.next(null);
  }
}
