import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fire:FirebaseServiceService   , private router: Router,  ){

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
      this.fire.registerUser(login,pass);
      this.router.navigate(['tourlist']);
      this.loginForm.reset()

    }
    else{
      alert('form not valid')
    }
  }
}
