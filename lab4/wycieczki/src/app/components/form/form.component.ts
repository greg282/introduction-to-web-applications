import { NgStyle } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() sendObjForm: EventEmitter<any> = new EventEmitter();
  sended_form:any;
  myForm:any;

  constructor(private _router:Router){}

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
        Validators.pattern("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)")
      ]),
    })
  }
  submit(){
    if(this.myForm.valid){
      console.log("Form sent")
      this.sendObjForm.emit(this.myForm.value);
      this.sended_form=this.myForm.value;
      this._router.navigateByUrl('/');
    }
    else{
      alert("Form not valid !")
    }
  }
}
