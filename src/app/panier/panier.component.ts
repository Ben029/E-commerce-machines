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

  user: User;
  //contenant les materiels dans le panier du client
  // panier: Panier;

  materiels: Material[];
  // materielsPanier: Panier;

  //stockera le wallet du client
  wallet: number = 0;
  //contenant le prix total des materiels dans le panier
  total: number = 0;
  classBudget: string;
  userSubscription: Subscription = new Subscription();
  materielsSubscription: Subscription = new Subscription();
  nombreInPanierSubscription: Subscription = new Subscription();
  nombre: number;



  constructor(private userService: UserService, private materielsService: MaterielsService) { }

  ngOnInit() {
    this.userService.userSubject.subscribe(
      (user: User | null) => {
        if (!user) return;
        else {
          this.user = user;
          // this.panier = this.user.panier;
          // this.materielsPanier = this.user.panier;
          this.wallet = this.user.wallet;
          // this.panier = this.user.panier;
          // console.log('user first subscribe on pannier : ', this.materielsPanier);
          // console.log('struct user : ', this.user);
          
          // console.log('Panier : ', typeof(this.user.panier));

          for (let materiel of this.user.panier.materiels) {
            // console.log('caca', materiel.price);

            this.total += materiel.price;
          }

          if (this.wallet >= 0) {
            this.classBudget = 'budget-done';
          } else {
            this.classBudget = 'budget-insuffisant';
            alert('Budget insuffisant ! ')
          }
        }
      }
    );

    this.materielsSubscription = this.materielsService.materielSubject.subscribe(
      (materiels: Material[]) => {
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
    if (this.user.panier.nombreDeCommande > 1) {
      this.user.panier[i].nombreDeCommande--;
      for (let materiel of this.materiels) {
        if (materiel == this.user.panier[i].materiels) {
          materiel.nbrInStock++;
        }
      }
      this.user.wallet += this.user.panier[i].materiels.price;

    } else if (this.user.panier[i].nombreDeCommande == 1) {
      this.user.wallet += this.user.panier[i].materiels.price;
      for (let materiel of this.materiels) {
        if (materiel == this.user.panier[i].materiels) {
          materiel.nbrInStock++;
        }
      }
      this.user.panier.splice(i, 1);
    } else {
      alert('Stock epuisé !!');
    }

    this.materielsService.emitMaterielSubject(this.materiels);
    this.userService.emitUserSubject(this.user);
  }

  removeAllMateriel(i: number) {
    // this.user.panier[i].materiels.price;
    while (this.user.panier[i].nombreDeCommande !== 0) {
      this.user.wallet += this.user.panier[i].materiels.price;
      this.user.panier[i].nombreDeCommande--;
      // console.log('caca')
    }
    this.user.panier.splice(i, 1);

    this.userService.emitUserSubject(this.user);
  }

}
