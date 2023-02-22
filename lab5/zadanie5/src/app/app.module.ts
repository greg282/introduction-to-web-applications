import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { CreateStudentComponent } from './students/create-student/create-student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailsComponent,
    StudentsListComponent,
    CreateStudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
