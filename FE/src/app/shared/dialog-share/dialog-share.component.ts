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
  constructor(
    public dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboardService: ClipboardService
  ) {
    this.clipboardContent = `url.com?id=${data.id}`;
  }
 
  copyToClipboard() {
    this.clipboardService.copyFromContent(this.clipboardContent);
  }
}
