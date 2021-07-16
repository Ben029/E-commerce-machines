import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Material } from '../models/materiel.model';
import { User } from '../models/user.model';
import { MaterielsService } from '../services/materiels.service';
import { Panier } from '../models/panier.model';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  user : User;
  //contenant les materiels dans le panier du client
  panier: any[];

  materiels :  Material[];
  materielsPanier : Panier[];
  
  //stockera le wallet du client
  wallet : number = 0;
  //contenant le prix total des materiels dans le panier
  total : number = 0;
  classBudget: string;
  userSubscription : Subscription = new Subscription();
  materielsSubscription : Subscription = new Subscription();
  nombreInPanierSubscription : Subscription = new Subscription();
  nombre : number;
  


  constructor(private userService: UserService, private materielsService: MaterielsService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User|null) => {
        if(!user) return;
        this.user = user;
        this.materielsPanier = this.user?.panier;
        this.wallet = this.user.wallet;
        // this.panier = this.user.panier;

        console.log('Panier : ', this.materielsPanier);

        for(let materiel of this.user.panier) {
          this.total += materiel.materiels.price;
        }

        if(this.wallet >= 0) {
          this.classBudget = 'budget-done';
        } else {
          this.classBudget = 'budget-insuffisant';
          alert('Budget insuffisant ! ')
        }
      }
    );

    this.materielsSubscription = this.materielsService.materielSubject.subscribe(
      (materiels : Material[]) => {
        this.materiels = materiels;
      }
    )

    // this.nombreInPanierSubscription = this.materielsService.nombreInPannierSubject.subscribe(
    //   (nombre: number) => {
    //     this.nombre = nombre;
    //     console.log('Nombre de commande dans panier : ' + this.nombre);
    //   }
    // );

    // this.materielsService.emitNombreInPannierSubject(this.nombre);
    this.userService.emitUserSubject(this.user);
  }


  removeOneMateriel(i: number) {
    // alert('prix dans panier : ' + nombre);
    if (this.user.panier[i].nombreDeCommande > 1) {
      this.user.panier[i].nombreDeCommande--;
      this.user.wallet += this.user.panier[i].materiels.price;

    } else if(this.user.panier[i].nombreDeCommande == 1) {
      this.user.wallet += this.user.panier[i].materiels.price;
      this.user.panier.splice(i, 1);
    } else {
      alert('Stock epuisé !!');
    }

    this.userService.emitUserSubject(this.user);
  }

  removeAllMateriel (i: number) {
    // this.user.panier[i].materiels.price;
    while(this.user.panier[i].nombreDeCommande !== 0) {
      this.user.wallet += this.user.panier[i].materiels.price;
      this.user.panier[i].nombreDeCommande--;
      // console.log('caca')
    }
    this.user.panier.splice(i, 1);

    this.userService.emitUserSubject(this.user);
  }

}
