import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewPopup } from './grid-view-popup';

describe('GridViewPopup', () => {
  let component: GridViewPopup;
  let fixture: ComponentFixture<GridViewPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridViewPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
