import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Student } from './student/student';
import { StudentDTO } from './models/student-dto';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  public studentChange:WritableSignal<StudentDTO[]> = signal([]); //Variable called studentChange, of type WritableSignal, which only accepts an array of StudentDTOs
}
