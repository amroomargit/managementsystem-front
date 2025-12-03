import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeachers } from './all-teachers';

describe('AllTeachers', () => {
  let component: AllTeachers;
  let fixture: ComponentFixture<AllTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTeachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTeachers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
