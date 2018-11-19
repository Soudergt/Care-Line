import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-hipaadialog',
  templateUrl: './hipaadialog.component.html',
  styleUrls: ['./hipaadialog.component.scss']
})
export class HipaadialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HipaadialogComponent>,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
