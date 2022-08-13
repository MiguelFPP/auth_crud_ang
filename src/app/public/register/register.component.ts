import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators['required']],
      email: ['', Validators['required']],
      password: ['', Validators['required']],
      password_confirmation: ['', Validators['required']],
    });
  }

  ngOnInit(): void {}

  get angForm(): any {
    return this.form.controls;
  }

  register(): void {
    const { name, email, password, password_confirmation } = this.form.value;
    const user = new User(name, email, password, password_confirmation);

    this._authService.register(user).subscribe(
      ({ user, access_token }) => {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['secure']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
