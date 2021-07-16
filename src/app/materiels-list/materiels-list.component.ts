import { Component, OnInit, OnDestroy } from '@angular/core';
import { Material } from '../models/materiel.model';
import { Subscription } from 'rxjs/Subscription';
// import { Subject } from 'rxjs/Subject';
import { MaterielsService } from '../services/materiels.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Panier } from '../models/panier.model';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-materiels-list',
  templateUrl: './materiels-list.component.html',
  styleUrls: ['./materiels-list.component.scss']
})
export class MaterielsListComponent implements OnInit, OnDestroy {

  // qui va permettre d' afficher le panier
  authStatus: boolean = false;
  user : User;
  added : boolean = false;
  panierUser: any[];
  isAuth = false;
  materiels : Material[] = [];
  addArray : boolean[] = [];
  panierLenght = 0;
  nombre: number;
  name: string;
  image: string;

  userSubscription : Subscription = new Subscription();
  materielsSubscription : Subscription = new Subscription();
  nombreDeCommandeSubscription : Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private materielsService: MaterielsService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.userSubject.subscribe(
      (user: User|null) => {
        // alert('caca')
        console.log('userrrrr ' , user)
        if (user) {
          this.user = user; 
          this.panierUser = this.user.panier;
          // this.panierLenght = this.user.panier.length;
          this.authStatus = this.user.isAuth;
          // alert('status : ' + this.authStatus)
          this.name = this.user.name;
          console.log('name : ' + this.name)
          this.image = this.user.image;
        }
      }
    );
    // this.userService.emitUserSubject({caca: 'test'} as any);
    //Materiels dans la base de donnée
    this.materielsSubscription = this.materielsService.materielSubject.subscribe(
      (materiels: Material[]) => {
        console.log('Subscribe to materiels');
        this.materiels = materiels;
      }
    );

    // this.nombreDeCommandeSubscription = this.materielsService.nombreInPannierSubject.subscribe(
    //   (nombre: number) => {
    //     this.nombre = nombre;
    //     console.log('nombre bonne : ' + this.nombre)
    //   }
    // );
    this.materielsService.emitMaterielSubject();
    if(this.user) {
      this.userService.emitUserSubject(this.user);
    }
    // this.materielsService.emitNombreInPannierSubject(this.nombre);
  }

  addPanier(i : number) {
    if (this.user.wallet >= this.materiels[i].price && this.materiels[i].nbrInStock > 0) {
        // this.materielsService.nombre;
        let added = false;
    
        console.log('User :: ' + this.user)
        // soustrait le prix du materiels du porte feuille du client
        this.user.wallet -= this.materiels[i].price;
        
        for(let materialTemp of this.user.panier) {
          if(this.materiels[i] === materialTemp.materiels) {
            materialTemp.nombreDeCommande += 1;
            console.log('Materiel deja ajoutée avant : ' + this.nombre);
            materialTemp.materiels.nbrInStock--; 
            // this.materiels[i].nbreInPanier++;
            console.log('nombre dans panier : ' + materialTemp.nombreDeCommande);

            this.nombre = materialTemp.materiels.nbreInPanier;
            console.log('materiels deja ajoutée : ' + this.nombre);
            added = true;
          }
        } 
        if (!added) {
          let mat : Panier = {
            materiels : {
              'type':'',
              'mark' : '',
              'description': '',
              'price': 0,
              'nbrInStock': 0,
              'imgUrl': '',
              'added': false,
              'nbreInPanier': 0
            },
            nombreDeCommande : 1
          };

          mat.materiels = this.materiels[i];
          mat.nombreDeCommande = 1;
          this.user.panier.push(mat);
          // this.panierUser.push(mat);
          // this.materiels[i].nbrInStock--; 
          // this.nombre = mat.nombreDeCommande;
        }
    } else {
      if (this.user.wallet < this.materiels[i].price) {
        alert('Veuillez recharger votre compte');
      } else if(this.materiels[i].nbrInStock === 0) {
        alert('Ce produit est en rupture de stock');
      }
    }
    // this.nombre = this.materiels[i].nbreInPanier;
    this.materielsService.emitNombreInPannierSubject(this.nombre);
    this.userService.emitUserSubject(this.user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
