import { NgStyle } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() sendObjForm: EventEmitter<any> = new EventEmitter();
  sended_form:any;
  myForm:any;
  file:any;
  submit_enabled:boolean=true;
  constructor(private _router:Router,private firebase:FirebaseServiceService){}

  ngOnInit(){
    this.myForm= new FormGroup({
      country_of_dest: new FormControl<String|null>(null,[
        Validators.required,
      ]),
      name: new FormControl<String|null>(null,[
        Validators.required,

      ]),
      description: new FormControl<String|null>(null,[
        Validators.required,

      ]),
      unit_price: new FormControl<Number|null>(null,[
        Validators.required,
        Validators.min(1)
      ]),
      max_people: new FormControl<Number|null>(null,[
        Validators.required,
        Validators.min(1)

      ]),
      start_date: new FormControl<Date | null>(null,[
        Validators.required,

      ]),
      end_date: new FormControl<Date | null>(null,[
        Validators.required,

      ]),
      photo_src: new FormControl<String|null>(null,[
        Validators.required,

      ]),
    })
  }
  submit(){
    if(this.myForm.valid){
      const obj=this.myForm.value;
      obj.photo_src=this.file;
      this.submit_enabled=false;
      this.firebase.createTour(obj).then(res=>this._router.navigate(['tourlist']));
    }
    else{
      alert("Form not valid !")
    }
  }
  detectFiles(event:any){
    this.file=event.target.files[0];
  }
}
