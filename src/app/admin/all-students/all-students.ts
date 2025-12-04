import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentDTO } from '../../models/student-dto';
import { inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-all-students',
  imports: [NgIf,NgFor],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css',
})
export class AllStudents implements OnInit{
  private http = inject(HttpClient); //we use http to connect to the backend endpoints (like with postman)

  students: StudentDTO[]=[];

  ngOnInit(){
    this.loadAllStudents();
  }

  loadAllStudents(){
    this.http.get<StudentDTO[]>('http://localhost:8081/students/all')
    .subscribe({
      next: (data) => {
        this.students = data;
        console.log("Loaded students:",data)
      },
      error: (e) => console.log("Error loading students:",e)
    });
  }



}
