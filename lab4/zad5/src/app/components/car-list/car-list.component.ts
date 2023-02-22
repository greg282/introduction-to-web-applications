import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient  } from '@angular/common/http';



@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  constructor(private httpClient: HttpClient){
  }
  data_set:any;
  cars:any;
  models:any;
  color_array:any;

  ngOnInit(){
    this.httpClient.get("assets/car_data.json").subscribe(temp =>{
        this.data_set=temp;
       this.cars=this.data_set.cars;
       this.models=this.data_set.models;
       this.color_array=this.data_set.color_array;
    })
  }



selectedCar: any="";
selectedModel: any="";
selectedColor: any="ffffff";
model_array:any;
selectid:number=0;
info:string="not selected";
info2:string="not selected";


getSelectedCar():void{
  if(this.selectedCar != null){
    this.info=this.selectedCar.name;
    this.model_array=this.models[this.selectedCar.id].model_array;
    this.clearData_model();
  }

}

clearData_brand():void{
  this.clearData_model();
  this.info="not selected";
  this.model_array=null;
  this.selectedCar="";

}
clearData_model():void{
  this.selectedModel=null;
  this.info2="not selected";
  this.selectedModel="";

}
getSelectedModel():void{
  if(this.selectedModel != null){
    this.info2=this.selectedModel.name;


  }
}

getSelectedColor():void{

}
clearData_Color():void{
  this.selectedColor ="ffffff";
}

}


