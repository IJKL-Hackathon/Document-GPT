import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotSelectedFileComponent } from './dialog-not-selected-file.component';

describe('DialogNotSelectedFileComponent', () => {
  let component: DialogNotSelectedFileComponent;
  let fixture: ComponentFixture<DialogNotSelectedFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNotSelectedFileComponent]
    });
    fixture = TestBed.createComponent(DialogNotSelectedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
