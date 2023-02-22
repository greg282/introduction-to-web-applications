import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fire:FirebaseServiceService,    private router: Router,    ){

  }

  ngOnInit(){
   
  }

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  submitForm(){
    if(this.loginForm.valid){
      let login = this.loginForm.get('login')!.value
      let pass = this.loginForm.get('password')!.value
      this.fire.loginUser(login,pass);
      this.loginForm.reset()

    }
    else{
      alert('form not valid')
    }
  }

}
