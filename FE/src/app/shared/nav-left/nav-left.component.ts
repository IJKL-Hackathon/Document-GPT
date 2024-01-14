import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { myObject, posts, res } from 'src/Data/res_file';
import { MatDialog } from '@angular/material/dialog'
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState';
import { FileService } from 'src/app/state/file/file.service';
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {
  res_file: any;
  res_file_upload: any;
  selectedFile: File | null = null;
  UserProfile: any;
  fileTitle: string = '';
  searchQuery: string = '';
  selectedFileIds: string[] = [];
  selectAllChecked: boolean = false;

  constructor(private diaolog: MatDialog, private userService: UserService, private store: Store<AppState>,
    private fileService: FileService,private elRef: ElementRef) {

  }
  ngOnInit() {
    this.res_file = myObject;
    console.log(this.res_file);

    if (localStorage.getItem("jwt")) {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.UserProfile = user.userProfile;
      // this.res_file = this.fileService.getFile(this.UserProfile.id);
      // console.log("user-nav",user);
      
      if (this.UserProfile) {
        this.diaolog.closeAll();
      }
      // console.log("user:" ,user);
      // console.log("userprofile:" ,user.userProfile);
    });

    this.res_file.forEach((data:any) => {
      data.isSelected = false;
    });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  onSubmit() {

    if (!this.UserProfile) {
      this.HandleLogin();
      // console.log('File selected:', this.selectedFile);

    } else if (this.UserProfile && this.selectedFile) {
      console.log(this.selectedFile);
      
      
      this.res_file_upload = this.fileService.uploadFile(this.UserProfile.id, this.selectedFile);
    }

  }

  HandleLogin() {
    this.diaolog.open(AuthComponent, {

    })

  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.userService.logout();
    this.isMenuOpen=false
  }
  onCheckboxChange(event: any, id: any) {
    if (event.target.checked) {
      // Checkbox is checked
      this.selectedFileIds.push(id);
      console.log("Selected File IDs:", this.selectedFileIds);
  
      // Save the updated file IDs
      this.fileService.saveFileId(this.selectedFileIds);
    } else {
      // Checkbox is unchecked
      // this.fileService.removeFileId(id);
      this.selectedFileIds = this.selectedFileIds.filter(fileId => fileId !== id);
      this.fileService.saveFileId(this.selectedFileIds);
      console.log("Removed File ID:", id);
    }
  
    // Retrieve the updated file IDs by subscribing to the observable
    this.fileService.getFileId().subscribe(updatedFileIds => {
      console.log('File IDs:', updatedFileIds);
    });
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  selectAll() {
    
    this.selectAllChecked = !this.selectAllChecked;
    if(this.selectAllChecked){
      this.selectedFileIds = this.res_file.map((data:any) => data.id);
      this.res_file.forEach((data:any) => {
        data.isSelected = true;
      });
      this.fileService.saveFileId(this.selectedFileIds)
    }else{
      this.selectedFileIds = [];
      this.res_file.forEach((data:any) => {
        data.isSelected = false;
      });
      this.fileService.saveFileId(this.selectedFileIds)
    }
    console.log(this.selectedFileIds);
    
  }


  
}
