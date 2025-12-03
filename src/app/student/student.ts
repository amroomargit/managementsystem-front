import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './student.html',
  styleUrl: './student.css',
})
export class Student {

}
