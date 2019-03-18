import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AddEventData {
  name: string;
  desc: string;
  date: Date;
  time: Date;
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {
  public addEventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {    
    this.addEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: [''],
      date: [new Date(), Validators.required],
      time: [new Date(), Validators.required]
    });
   }

  ngOnInit() {
  }

  add() {
    this.dialogRef.close(this.addEventForm.value);    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
