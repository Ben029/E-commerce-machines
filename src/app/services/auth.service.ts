import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;
  userId: string;
  //pour l'utilisateur quand il se met à loggé
  isAuthentified: boolean = false;
  //variable qui va recuperer le status de l' utilisateur
  isAuth: boolean;
  authSubscription: Subscription;

  authSubject = new Subject<boolean>();

  constructor(private userService: UserService, private http: HttpClient) { }

  signIn(email: string, password: string) : Promise<User> {
    return <Promise<User>> this.http.post('http://localhost:3000/api/auth/login', { email: email, password: password }).toPromise();
  }

  signUp(name: string, email: string, password: string) : Promise<User> {
    return <Promise<User>> this.http.post('http://localhost:3000/api/auth/signup',{ email: email, password: password, name: name }).toPromise();
  }

  signOut() {
    this.isAuthentified = false;
  }

  // emitUserSubject() {
  //   return this.
  // }
}

  


