import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizizzComponent } from './quizizz.component';

describe('QuizizzComponent', () => {
  let component: QuizizzComponent;
  let fixture: ComponentFixture<QuizizzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizizzComponent]
    });
    fixture = TestBed.createComponent(QuizizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
