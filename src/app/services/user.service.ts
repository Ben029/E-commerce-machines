import { Injectable } from '@angular/core';
import { Material } from '../models/materiel.model';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Panier } from '../models/panier.model';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private materielsInStock : Material[] = [];

  userSubject = new BehaviorSubject<User|null>(null);
  userSubscription = new Subscription();
  apiUrl = 'http://localhost:3000/api/auth/updateUser';

  // public user : User;

  constructor(private http: HttpClient) {
    this.userSubject.asObservable();
  }

  ngOnInit() {
  }

  emitUserSubject(user: User) {
    console.log('emit user :   ', user)
    this.userSubject.next(user);
  }

  updateUser(userId : string, idMaterial : string, material : Material) {
    return <Promise<any>> this.http.put(`${this.apiUrl}/${userId}/${idMaterial}`, material).toPromise();
  }




}