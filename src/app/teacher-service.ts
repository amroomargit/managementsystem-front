import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TeacherDTO } from './models/teacher-dto';
import { TopicDTO } from './models/topic-dto';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
public teachers:WritableSignal<TeacherDTO[]> = signal([]);
public topics:WritableSignal<TopicDTO[]> = signal([]);

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

  loadAllTopics(){
    this.http.get<TopicDTO[]>('http://localhost:8081/topics/all')
    .subscribe({
      next:(data) => {
        this.topics.set(data);
        console.log(data);
      }
    })
  }

}
