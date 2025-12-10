import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertStudentPopup } from './insert-student-popup';

describe('InsertStudentPopup', () => {
  let component: InsertStudentPopup;
  let fixture: ComponentFixture<InsertStudentPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertStudentPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertStudentPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
