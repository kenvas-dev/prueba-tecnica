import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  disableEnter($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    return;
  }
  public loginForm: FormGroup;
  public hide: Boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.hide = true;

    if (
      this.loginForm?.get('user')?.value != '' &&
      this.loginForm?.get('password')?.value != ''
    ) {
       this.router.navigate(['pages']);
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
