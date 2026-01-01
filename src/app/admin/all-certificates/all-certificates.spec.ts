import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCertificates } from './all-certificates';

describe('AllCertificates', () => {
  let component: AllCertificates;
  let fixture: ComponentFixture<AllCertificates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCertificates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCertificates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
