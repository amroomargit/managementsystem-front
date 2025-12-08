import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentPopup } from './update-student-popup';

describe('UpdateStudentPopup', () => {
  let component: UpdateStudentPopup;
  let fixture: ComponentFixture<UpdateStudentPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
