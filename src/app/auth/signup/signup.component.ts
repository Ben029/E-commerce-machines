import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isAuthentified: boolean = false;  
  userSignup: FormGroup;
  user: User;
  userSubscription: Subscription = new Subscription();


  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.isAuthentified = this.authService.isAuthentified;
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User|null) => {
        if (!user) return;
        this.user = user;
      }
    );
    this.userService.emitUserSubject(this.user);
  }



  initForm() {
    this.userSignup = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  onSignUp(): void {
    const name = this.userSignup.value.name + ' ' + this.userSignup.value.lastName;
    const email = this.userSignup.value.email;
    const password = this.userSignup.value.password;

    this.authService.signUp(name, email, password).then(
      (user : User) => {
        this.user = user;
        this.isAuthentified = true;
        this.authService.isAuthentified = this.isAuthentified;
        console.log(this.user);
        this.userService.emitUserSubject(this.user);
        this.router.navigate(['materiels-list']);
      }
    );
  }

  onSubmit() {
    
  }
}
