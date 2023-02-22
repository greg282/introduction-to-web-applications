import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;
  myForm:any;
  constructor(private StudentService: StudentService) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    this.StudentService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
