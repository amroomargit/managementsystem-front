import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollInCoursePopup } from './enroll-in-course-popup';

describe('EnrollInCoursePopup', () => {
  let component: EnrollInCoursePopup;
  let fixture: ComponentFixture<EnrollInCoursePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollInCoursePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollInCoursePopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
