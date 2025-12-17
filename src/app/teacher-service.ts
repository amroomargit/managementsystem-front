import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TeacherDTO } from './models/teacher-dto';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
public teachers:WritableSignal<TeacherDTO[]> = signal([]);

  private http = inject(HttpClient);

  loadAllTeachers(){
    this.http.get<TeacherDTO[]>('http://localhost:8081/teachers/all')
    .subscribe({
      next:(data) => {
        this.teachers.set(data);
        console.log(data);
      }
    });
  }

  
}
