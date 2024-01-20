import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaComponent } from './qa.component';

describe('QaComponent', () => {
  let component: QaComponent;
  let fixture: ComponentFixture<QaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QaComponent]
    });
    fixture = TestBed.createComponent(QaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
