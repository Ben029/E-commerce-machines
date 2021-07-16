import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isAuthentified: boolean = false;
  userSignin: FormGroup = new FormGroup({});
  user: User;
  n: number = 1;
  userSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.initForm();
    this.userSignin = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
    this.isAuthentified = this.authService.isAuthentified;
    // this.userSubscription = this.userService.userSubject.subscribe(
    //   (user: User) => {
    //     this.user = user;
    //     console.log('USER : ' + this.user);
    //   }
    // );
    // this.userService.emitUserSubject(this.user);
  }

  onSignIn() {
    const email = this.userSignin.get('email')?.value;
    const password = this.userSignin.get('password')?.value;
    this.authService.signIn(email, password).then(
      (dataUser: any) => {
        console.log('data user : ', dataUser);
        this.user = dataUser.user;
        console.log('user ato am onsign in: ', this.user)
        console.log('\n')
        this.isAuthentified = true;
        this.authService.isAuthentified = this.isAuthentified;

        this.userService.emitUserSubject(this.user);
        console.log('Observable : ', this.userService.user);
        this.router.navigate(['materiels-list']);
      }
    );

  }

  onSubmit(): void {

  }
}

