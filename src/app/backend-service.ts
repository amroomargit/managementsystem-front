import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { StudentDTO } from './models/student-dto';
import { CourseDTO } from './models/course-dto';
import { HttpClient } from '@angular/common/http';
import { TeacherDTO } from './models/teacher-dto';
import { TopicDTO } from './models/topic-dto';
import { UserDTO } from './models/user-dto';
import { D } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public students:WritableSignal<StudentDTO[]> = signal([]); //Variable called studentChange, of type WritableSignal, which only accepts an array of StudentDTOs
  public courses:WritableSignal<CourseDTO[]> = signal([]);
  public teachers:WritableSignal<TeacherDTO[]> = signal([]);
  public topics:WritableSignal<TopicDTO[]> = signal([]);
  public user:WritableSignal<UserDTO | null> = signal(null);

  private http = inject(HttpClient);

  loadAllStudents(){
      this.http.get<StudentDTO[]>('http://localhost:8081/students/all') //Sends HTTP get request to backend, expects a list of StudentDTOs to be returned (in .ts there is no List<>, we use array [])
      .subscribe({ //When backend responds, run the function below
        next:(data) => { //data is the array of students we recieved from the backend
          this.students.set(data); //We are calling .set() on a WritableSignal (named students, imported from backend-service.ts), and passing through our data (the array of students), which updates its value
          console.log(data); //This is just returning the array to the console so we can check that it actually did pass through
        }
        /*Doing it this way solved the ExpressionChangedAfterItHasBeenCheckedError because before we were using
        Observable + async pipe + late update inside lifecycle, but now we are using Signals + .set() from HTTP response*/
      });
    }

    loadAllCourses(){
      this.http.get<CourseDTO[]>('http://localhost:8081/courses/all')
      .subscribe({
        next:(data) => {
          this.courses.set(data); //sets the data into the courses signal so we can access the stream of DTOs it's loaded with in other classes
        }
      });
    }

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

    loadCoursesStudentIsEnrolledIn(studentId:number){
      this.http.get<CourseDTO[]>(`http://localhost:8081/courses/get-a-students-courses/${studentId}`)
      .subscribe({
        next:(data) => {
          this.courses.set(data);
        }
      });
    }

    loadAllCoursesTaughtByTeacher(teacherId:number){
    this.http.get<CourseDTO[]>(`http://localhost:8081/teachers/get-courses-of-teacher/${teacherId}`)
    .subscribe({
      next:(data) => {
        this.courses.set(data);
        console.log(data);
      }
    })
  }

    loadAllTopicsTaughtByTeacher(teacherId:number){
      this.http.get<TopicDTO[]>(`http://localhost:8081/teachers/get-topics-of-teacher/${teacherId}`)
      .subscribe({
        next:(data) => {
          this.topics.set(data);
          console.log(data);
        }
      });
    }

    loadAllStudentsInACourse(courseId:number){
      this.http.get<StudentDTO[]>(`http://localhost:8081/students/get-students-in-a-course/${courseId}`)
      .subscribe({
        next:(data) => {
          this.students.set(data);
          console.log(data);
        }
      });
    }

    loadAllStudentsTakingATopic(topicId:number){
      this.http.get<StudentDTO[]>(`http://localhost:8081/students/topics-students/${topicId}`).subscribe({
        next:(data)=>{
          this.students.set(data);
        }
      })
    }

    loadAllTeachersTeachingATopic(topicId:number){
      this.http.get<TeacherDTO[]>(`http://localhost:8081/topics/topics-teachers/${topicId}`).subscribe({
        next:(data)=>{
          this.teachers.set(data);
        }
      })
    }

    resetCourseList(){
      this.courses.set([]); // clear the signal
      }

    resetTopicList(){
      this.topics.set([]);
    }

    resetStudentList(){
      this.students.set([]);
    }

    resetTeacherList() {
      this.teachers.set([]);
    }

}
