import { Routes } from '@angular/router';
import { Student } from './student';
import { AllCourses } from './all-courses/all-courses';
import { AllTopics } from './all-topics/all-topics';

export const routes: Routes = [{
  path: '',
  component: Student,
  children: [{
    path: 'all-courses',
    component: AllCourses
  },
  {
    path: 'all-topics',
    component: AllTopics
  }]
}]
