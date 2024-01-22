import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzShareComponent } from './quizz-share.component';

describe('QuizzShareComponent', () => {
  let component: QuizzShareComponent;
  let fixture: ComponentFixture<QuizzShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzShareComponent]
    });
    fixture = TestBed.createComponent(QuizzShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
