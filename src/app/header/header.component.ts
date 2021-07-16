import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authStatus : boolean = false;
  authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authSubject.subscribe(
      (value: boolean) => {
          this.authStatus = this.authService.isAuthentified;
      }
    );
    this.authStatus = this.authService.isAuthentified;  
  }



  // onSignIn(): void {
  //   this.authService.signIn().then(
  //     () => {
  //       // this.authStatus = this.authService.isAuthentified;
  //       this.authService = this
  //       console.log('Sign in successful ! ');
  //       this.router.navigate(['/materiels-list']);
  //     });
  // }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuthentified;
    this.router.navigate(['/auth']);
  }

}
