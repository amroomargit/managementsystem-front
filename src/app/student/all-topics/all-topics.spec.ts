import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopics } from './all-topics';

describe('AllTopics', () => {
  let component: AllTopics;
  let fixture: ComponentFixture<AllTopics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTopics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTopics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
