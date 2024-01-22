import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState';
import { FileService } from 'src/app/state/file/file.service';
import { Router } from '@angular/router';
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
  uploadProgress: number = 0;

  constructor(private diaolog: MatDialog, private userService: UserService, private store: Store<AppState>,
    private fileService: FileService,private elRef: ElementRef,private router: Router) {
  }
  ngOnInit() {
    // this.res_file = res;
    
    if (localStorage.getItem("jwt")) {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.UserProfile = user.userProfile;
      this.fileService.getFile(this.UserProfile.id).subscribe((res) => {
        this.res_file = res;
      });
      console.log(this.res_file);
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
      // console.log(this.UserProfile, this.selectedFile);
      this.fileService.uploadFile(this.UserProfile.id, this.selectedFile).subscribe((res) => {
        this.res_file_upload = res;
        this.fileService.getFile(this.UserProfile.id).subscribe((res) => {
          this.res_file = res;
        });
      });
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
    this.res_file=[];
    this.router.navigate(['/']);
  }
  onCheckboxChange(event: any, id: any) {
    if (event.target.checked) {
      // this.fileIdSelected=id;
      this.fileService.saveFileId(id);
      this.fileService.updateSelectedFileIds(id, event.target.checked);
      console.log('Checkbox checked with id:', this.fileService.getFileId());
    } else {
      console.log('Checkbox unchecked with id:', id);
    }
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  get getFileId(): string {
    return this.fileService.getFileId();
  }

  // selectAll() {
    
  //   this.selectAllChecked = !this.selectAllChecked;
  //   if(this.selectAllChecked){
  //     this.selectedFileIds = this.res_file.map((data:any) => data.id);
  //     this.res_file.forEach((data:any) => {
  //       data.isSelected = true;
  //     });
  //     this.fileService.saveFileId(this.selectedFileIds)
  //   }else{
  //     this.selectedFileIds = [];
  //     this.res_file.forEach((data:any) => {
  //       data.isSelected = false;
  //     });
  //     this.fileService.saveFileId(this.selectedFileIds)
  //   }
  //   console.log(this.selectedFileIds);
    
  // }


  
}
