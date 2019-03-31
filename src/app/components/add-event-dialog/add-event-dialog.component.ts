import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

export interface AddEventData {
  EventName: string;
  EventDesc: string;
  EventDate: Date;
  EventTime: Date;
  EventID?: number;
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {
  public addEventForm: FormGroup;
  edit: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    if (this.data.event) {
      this.edit = true;
      this.addEventForm = this.formBuilder.group({
        EventName: [this.data.event.EventName, Validators.required],
        EventDesc: [this.data.event.EventDesc, Validators.required],
        EventDate: [this.data.event.EventDate, Validators.required],
        EventTime: [this.data.event.EventTime, Validators.required],
        EventID: [this.data.event.EventID]
      });
    } else {
      this.edit = false;
      this.addEventForm = this.formBuilder.group({
        EventName: ['', Validators.required],
        EventDesc: ['', Validators.required],
        EventDate: [moment().toDate(), Validators.required],
        EventTime: [, Validators.required]
      });
    }    
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
