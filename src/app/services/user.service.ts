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

  public user : User = {
    name: 'Riana Ben Andriarinaivo',
    email: 'rianaben002@gmail.com',
    password: '123456',
    panier : [],
    wallet: 25500,
    isAuth : false,
    image: 'https://disney-planet.fr/wp-content/uploads/2015/01/timon-personnage-le-roi-lion-01.jpg'
  };

  constructor(private http: HttpClient) {
    this.userSubject.asObservable();
  }

  ngOnInit() {
    // this.userSubscription = this.userSubject.subscribe(
    //   (user : User) => {
    //     this.user = user;
    //     console.log('User zfef : : : ' + this.user);
    //     this.emitUserSubject(this.user);
    //   }
    // )
    
  }

  emitUserSubject(user: User) {
    console.log('emit user :   ', user)
    this.userSubject.next(user);
  }

  getPanier() {
    this.http.get<Panier[]>('http://localhost:3000/').subscribe(
      (materiels) => {
        this.user.panier = materiels;
      },
      (error) => {
        console.log('Erreur du get ' + error);
      }
    );
  }

}