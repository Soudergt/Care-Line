import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../providers/login/login.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public STATUSES: any = {
    UNTOUCHED: 0,
    LOGGING_IN: 1,
    BAD_FORM: 2,
    BAD_REQUEST: 3
  };
  public status: BehaviorSubject<number>;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.status = new BehaviorSubject<number>(this.STATUSES.UNTOUCHED);
  }

  ngOnInit() {
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
      }
    });
  }

}
