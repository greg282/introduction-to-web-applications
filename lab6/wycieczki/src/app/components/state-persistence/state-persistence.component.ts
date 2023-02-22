import { Component } from '@angular/core';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
@Component({
  selector: 'app-state-persistence',
  templateUrl: './state-persistence.component.html',
  styleUrls: ['./state-persistence.component.css']
})
export class StatePersistenceComponent {
  curr_state:any='';
  constructor(private fire:FirebaseServiceService){

  }
  


  changePersistence(mode:any){
    this.fire.changePersistance(mode);
    this.curr_state='Stan aktualny: '+mode;
  }

}
