import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  nameTaken = true;
  passwordMatch = true;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginUsername: new FormControl(),
      loginPassword: new FormControl(),
      loginRepeatPassword: new FormControl()
    });
  }

  signup() {
    this.nameTaken = true;
    this.passwordMatch = true;
    const username = this.loginForm.controls.loginUsername.value;
    const password = this.loginForm.controls.loginPassword.value;
    const repeatPassword = this.loginForm.controls.loginRepeatPassword.value;
    if (password === repeatPassword) {
      this.userService.signup(username, password).subscribe(async () => {
          await this.router.navigate(['/login']).then(() => {
          });
        }, () => {
          this.nameTaken = false;
        }
      );
    } else {
      this.passwordMatch = false;
    }
  }
}
