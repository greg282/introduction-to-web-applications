import { Component } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {
  userList:any=[];
  selectedUser:any=false;
  selected:number=1;
  show_edit:boolean=false;
  constructor(private fire:FirebaseServiceService){

  }

  ngOnInit(){
    this.userList=[];
    this.fire.getUsersList().then(data=>data.forEach(el=>this.addToUserList(el.data()))).finally(()=>{})
  }

  addToUserList(user:any){
    this.userList.push(user);
  }

  selectOption(event:any){
    this.fire.getUserById(this.selected).then(data=>this.selectedUser=data.docs[0].data())
  }
  banUser(){
    this.fire.banUserById(this.selectedUser.id);
    this.selectedUser.banned=true;
  }
  unbanUser(){
    this.fire.unbanUserById(this.selectedUser.id);
    this.selectedUser.banned=false;
  }
  setEditMode(){
    this.show_edit=true;
  }
  disableEditMode(selectedUser:any){
    this.fire.updateRolesByID(selectedUser.id,selectedUser);
    this.show_edit=false;
  }

}
