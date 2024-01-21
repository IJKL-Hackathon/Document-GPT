import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavLeftComponent } from './nav-left.component';

describe('NavLeftComponent', () => {
  let component: NavLeftComponent;
  let fixture: ComponentFixture<NavLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavLeftComponent],
      imports: [FormsModule, HttpClientModule], // Add necessary imports
    });
    fixture = TestBed.createComponent(NavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection and upload', fakeAsync(() => {
    const file = new File(['test content'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    const inputElement = fixture.debugElement.nativeElement.querySelector('input[type="file"]');
    const spyFileSelected = spyOn(component, 'onFileSelected').and.callThrough();
    const spySubmit = spyOn(component, 'onSubmit').and.callThrough();

    // Trigger file selection
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    // Verify that onFileSelected has been called
    expect(spyFileSelected).toHaveBeenCalled();

    // Set the selected file
    component.selectedFile = file;

    // Trigger form submission
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    tick();

    // Verify that onSubmit has been called
    expect(spySubmit).toHaveBeenCalled();
  }));
});
