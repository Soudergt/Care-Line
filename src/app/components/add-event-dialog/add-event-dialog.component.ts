import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

export interface AddEventData {
  EventName: string;
  EventDesc: string;
  EventDate: Date;
  EventTime: Date;
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
    console.log(this.data.event);

    this.addEventForm = this.formBuilder.group({
      EventName: ['', Validators.required],
      EventDesc: ['', Validators.required],
      EventDate: [moment().toDate(), Validators.required],
      EventTime: [, Validators.required]
    });
   }

  ngOnInit() {
  }

  add() {
    if (this.addEventForm.invalid) {
      return;
    }
    let date = moment(this.addEventForm.value.EventDate);
    date.hour(0).minute(0).second(0).millisecond(0);
    this.addEventForm.value.EventDate = date.toISOString();
    
    this.dialogRef.close(this.addEventForm.value);    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
