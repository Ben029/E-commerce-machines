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
  user: User;
  added: boolean = false;
  panierUser: Panier[];
  isAuth = false;
  materiels: Material[] = [];
  addArray: boolean[] = [];
  panierLenght = 0;
  nombre: number;
  name: string;
  image: string;

  userSubscription: Subscription = new Subscription();
  materielsSubscription: Subscription = new Subscription();
  nombreDeCommandeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private materielsService: MaterielsService, private authService: AuthService) { }

  ngOnInit() {
    this.onGetAllMaterial();
    this.userService.userSubject.subscribe(
      (user: User | null) => {
        if (user) {
          // console.log('userrrrr ', user.id)
          console.log('uuuuuussssssererrrrr : ', user)
          this.user = user;
          // this.panierUser = this.user.panier;
          this.authStatus = this.user.isAuth;
        }
      }
    );
    // this.userService.emitUserSubject({caca: 'test'} as any);
    //Materiels dans la base de donnée
    this.materielsSubscription = this.materielsService.materielSubject.subscribe(
      (materiels: Material[]) => {
        console.log('Subscribe to materiels');
        for(let material of materiels) {
        console.log('id :  ', material._id);
        }
        this.materiels = materiels;
      }
    );

    this.materielsService.emitMaterielSubject(this.materiels);
    console.log('aloan farany')
    if (this.user) {
      this.userService.emitUserSubject(this.user);
    }
    // this.materielsService.emitNombreInPannierSubject(this.nombre);
  }

  onGetAllMaterial() {
    this.materielsService.getMateriels().then(
      (data :any[]) => {
        console.log('materials data : ', data);
        this.materiels = data;
        this.materielsService.emitMaterielSubject(this.materiels)
      });
  }


  addPanier(_id: string) {
    let currentMateriel = this.materiels.find(materiel => {
      if(materiel._id === _id) {
        return true;
      } else {
        return false;
      }
    });
    if (currentMateriel) {
      if (this.user.wallet >= currentMateriel.price && currentMateriel.nbrInStock > 0) {
        // this.materielsService.nombre;
        let added = false;

        console.log('User :: ' + this.user)
        // soustrait le prix du materiels du porte feuille du client
        this.user.wallet -= currentMateriel.price;
        for (let materialTemp of this.user.panier) {
          console.log("matatta : " + materialTemp);

          if (currentMateriel === materialTemp.materiels) {
            materialTemp.nombreDeCommande += 1;
            console.log('Materiel deja ajoutée avant : ' + this.nombre);
            materialTemp.materiels.nbrInStock--;
            console.log('nombre dans panier : ' + materialTemp.nombreDeCommande);

            this.nombre = materialTemp.materiels.nbreInPanier;
            console.log('materiels deja ajoutée : ' + this.nombre);
            added = true;
          }
        }
        let mat: Panier = {
          materiels: {
            // 'id': '',
            'type': '',
            'mark': '',
            'description': '',
            'price': 0,
            'nbrInStock': 0,
            'imgUrl': '',
            'added': false,
            'nbreInPanier': 0
          },
          nombreDeCommande: 1
        };
        if (!added) {
          currentMateriel.nbrInStock--;
          mat.materiels = currentMateriel;
          mat.nombreDeCommande = 1;
          this.user.panier.push(mat);
          console.log('user id : ' + this.user._id);
          this.userService.updateUser(this.user._id, currentMateriel._id, currentMateriel).then(() => {
            console.log('update success')
          }).catch((err) => {
            console.log('update error : ' + err.message)
          });

          // this.panierUser.push(mat);
          // this.materiels[i].nbrInStock--;
          // this.nombre = mat.nombreDeCommande;
        }

        this.materielsService.updateMateriel(currentMateriel._id, currentMateriel);
        console.log('iiidddddd : ', currentMateriel._id );

      } else {
        if (this.user.wallet < currentMateriel.price) {
          alert('Veuillez recharger votre compte');
        } else if (currentMateriel.nbrInStock === 0) {
          alert('Ce produit est en rupture de stock');
        }
      }
      // this.nombre = this.materiels[i].nbreInPanier;
      this.materielsService.emitNombreInPannierSubject(this.nombre);
      this.userService.emitUserSubject(this.user);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
