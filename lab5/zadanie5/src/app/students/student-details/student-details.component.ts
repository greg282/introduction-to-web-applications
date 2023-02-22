import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student: Student;
  enabled:boolean=true;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.student.key);
  }

  onClickEdit(event:any){
    this.enabled=!this.enabled;
  }
  onSubmit(){
    this.enabled=!this.enabled;
    this.studentService.updateStudent(this.student.key,this.student.age);
  }

}
