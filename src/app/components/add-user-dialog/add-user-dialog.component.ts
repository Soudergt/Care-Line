import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AddUserData {
  fn: string;
  ln: string;
  username: string;
  password: string;

}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public addUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    console.log(this.data);
    
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  add() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
