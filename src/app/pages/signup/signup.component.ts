import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../providers/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { HipaadialogComponent } from './../../components/hipaadialog/hipaadialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public STATUSES: any = {
    UNTOUCHED: 0,
    SIGNING_UP: 1,
    BAD_FORM: 2,
    BAD_REQUEST: 3
  };
  public status: BehaviorSubject<number>;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService,
    ) {
    this.signupForm = this.formBuilder.group({
      fn: ['', Validators.required],
      ln: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      pname: ['', Validators.required],
      agreeHipaa: [false, Validators.required]
    });
    this.status = new BehaviorSubject<number>(this.STATUSES.UNTOUCHED);
   }

  openDialog(event): void {
    event.preventDefault();
    this.dialog.open(HipaadialogComponent, {
      width: '800px',
    });
  }

  ngOnInit() {
  }

  public async signUp() {
    if (this.signupForm.invalid) {
      return this.status.next(this.STATUSES.BAD_FORM);
    }

    this.status.next(this.STATUSES.SIGNING_UP);

    // this.loginService.signup(
    //   this.signupForm.controls.username.value,
    //   this.signupForm.controls.password.value
    // ).subscribe({
    //   error: () => {
    //     console.log('error');
    //   },
    //   next: () => {
        
    //   }
    // });
  }

}
