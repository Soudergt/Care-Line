import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../providers/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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
    private loginService: LoginService,
    ) {
    this.signupForm = this.formBuilder.group({
      fn: ['', Validators.required],
      ln: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      pname: ['', Validators.required]
    });
    this.status = new BehaviorSubject<number>(this.STATUSES.UNTOUCHED);
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
