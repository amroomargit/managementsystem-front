import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Student } from './student/student';
import { StudentDTO } from './models/student-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  public students:WritableSignal<StudentDTO[]> = signal([]); //Variable called studentChange, of type WritableSignal, which only accepts an array of StudentDTOs

  private http = inject(HttpClient);

  loadAllStudents(){
      this.http.get<StudentDTO[]>('http://localhost:8081/students/all') //Sends HTTP get request to backend, expects a list of StudentDTOs to be returned (in .ts there is no List<>, we use array [])
      .subscribe({ //When backend responds, run the function below
        next:(data) => { //data is the array of students we recieved from the backend
          this.students.set(data); //We are calling .set() on a WritableSignal (named students, imported from student-service.ts), and passing through our data (the array of students), which updates its value
          console.log(data); //This is just returning the array to the console so we can check that it actually did pass through
        }
        /*Doing it this way solved the ExpressionChangedAfterItHasBeenCheckedError because before we were using
        Observable + async pipe + late update inside lifecycle, but now we are using Signals + .set() from HTTP response*/
      });
    }
}
