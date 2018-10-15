import { Router } from '@angular/router';
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
  public STATUSES: any = {
    UNTOUCHED: 0,
    LOGGING_IN: 1,
    BAD_FORM: 2,
    BAD_REQUEST: 3
  };
  public status: BehaviorSubject<number>;

  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.status = new BehaviorSubject<number>(this.STATUSES.UNTOUCHED);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async login() {
    if (this.loginForm.invalid) {
      return this.status.next(this.STATUSES.BAD_FORM);
    }

    this.status.next(this.STATUSES.LOGGING_IN);

    this.loginService.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).subscribe({
      error: () => {
        console.log('error');
      },
      next: () => {
        this.router.navigate(['dashboard']);
        this.dialogRef.close();
      }
    });
  }

}
