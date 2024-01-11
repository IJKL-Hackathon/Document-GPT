import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumComponent } from './sum.component';

describe('SumComponent', () => {
  let component: SumComponent;
  let fixture: ComponentFixture<SumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumComponent]
    });
    fixture = TestBed.createComponent(SumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
