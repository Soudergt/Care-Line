import { LoginService } from './../../providers/login/login.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.scss']
})
export class LogindialogComponent {

  public loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async login() {
    this.loginService.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).subscribe({
      error: () => {
        console.log('error');
      },
      next: () => {
        console.log('logged in');
      }
    });
  }

}
