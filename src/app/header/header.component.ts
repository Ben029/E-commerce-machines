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
    this.authService.authSubject.subscribe(
      (value: boolean) => {
          this.authStatus = value;
      }
    );
    this.authStatus = this.authService.isAuthentified;  
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuthentified;
    this.authService.emitStateSubject(this.authStatus);
    this.router.navigate(['/auth']);
  }

}
