import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router:Router) {
    this.form = this.fb.group({
      email: ['', Validators['required']],
      password: ['', Validators['required']],
    });
  }

  ngOnInit(): void {}

  login() {
    const { email, password } = this.form.value;
    this._authService.login(email, password).subscribe(
      ({ user, access_token }) => {
        localStorage.setItem('token', access_token);
        this.router.navigate(['secure']);
      },
      (error) => {
        if (error.status === 401) {
          alert('Invalid email or password');
        }
        console.log(error);
      }
    );
  }

  get angForm(): any {
    return this.form.controls;
  }
}
