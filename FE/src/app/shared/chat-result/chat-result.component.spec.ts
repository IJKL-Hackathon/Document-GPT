import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatResultComponent } from './chat-result.component';

describe('ChatResultComponent', () => {
  let component: ChatResultComponent;
  let fixture: ComponentFixture<ChatResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatResultComponent]
    });
    fixture = TestBed.createComponent(ChatResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
