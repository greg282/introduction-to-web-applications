import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private firestore:AngularFirestore) {

  }

  createStudent(student: Student): void {
    this.firestore.collection("Students").add({...student}).then(res => {console.log(res)}, err => alert(err));

  }

  updateStudent(key: string, value: any) {
    this.firestore.collection("Students").doc(key).set({age:value},{ merge: true });
  }

  deleteStudent(key: string) {
    return this.firestore.collection("Students").doc(key).delete();
  }

  getStudentsList()  {
    return this.firestore.collection("Students").snapshotChanges();
  }

   deleteAll(data:any) {
    data.forEach(element => {
      if(!element.payload.doc.data().hasOwnProperty('temp'))
      {
      this.firestore.collection("Students").doc(element.payload.doc.id).delete();
      }
    });
   }

}
