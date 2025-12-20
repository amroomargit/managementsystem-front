import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifiedGridViewPopup } from './simplified-grid-view-popup';

describe('SimplifiedGridViewPopup', () => {
  let component: SimplifiedGridViewPopup;
  let fixture: ComponentFixture<SimplifiedGridViewPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplifiedGridViewPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplifiedGridViewPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
