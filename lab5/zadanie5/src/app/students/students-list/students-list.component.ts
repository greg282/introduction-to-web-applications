import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: any=[];
  res:any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudentsList();
  }

  getStudentsList() {
    this.studentService.getStudentsList().subscribe(res=>this.getKeys(res));

  }

  getKeys(res:any){
    this.res=res;
    this.students=[];
    res.forEach(element => {
      if(!element.payload.doc.data().hasOwnProperty('temp')){
        const temp=element.payload.doc.data();
        temp.key=element.payload.doc.id;
        this.students.push(temp);
      }
    });
  }

  deleteStudents() {
    this.studentService.deleteAll(this.res);
  }

}
