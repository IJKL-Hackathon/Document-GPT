import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistoryComponent } from 'src/app/history/history.component';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent {
  clipboardContent: string; 
  baseUrl: any;
  constructor(
    
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboardService: ClipboardService
  ) {
    this.baseUrl = window.location.origin;
    this.clipboardContent = this.baseUrl + `/share?id=${data.id}`;
  }

  ngOninit() {
    // this.baseUrl = window.location.origin;
    // console.log(this.baseUrl);
    
  }
 
  copyToClipboard() {
    this.clipboardService.copyFromContent(this.clipboardContent);
  }
}
