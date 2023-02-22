import { Component } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-tripmanager',
  templateUrl: './tripmanager.component.html',
  styleUrls: ['./tripmanager.component.css']
})
export class TripmanagerComponent {
  db:any=[];
  form_enabled=false;
  edit_mode_price:boolean=false;
  edit_mode_people:boolean=false;
  new_value:any=null;
  constructor(public fire:FirebaseServiceService){

  }
  ngOnInit(){
    this.fire.getData().then(data=>this.setData(data.docs.map(el=>Object.assign(el.data(),{id:el.id}))))

  }

  setData(data:any){
    this.db=data;
    console.log(this.db)
  }

  setEditMode(){
    this.edit_mode_price=true;
  }

  updatePrice(id:any,new_price:any){
    this.fire.updatePriceByID(id,new_price);
    this.edit_mode_price=false;
  }

  delFromDb(id:any){
    this.fire.deleteByID(id);
  }

  showForm(){
    this.form_enabled=true;
  }
  hideForm(){
    this.form_enabled=false;
  }

  setEditModePeople(){
    this.edit_mode_people=true;

  }
  updatePeople(id:any,value:any){
    this.fire.updatePeopleByID(id,value);
    this.edit_mode_people=false;
  }
}
