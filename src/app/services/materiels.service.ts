import { Injectable } from '@angular/core';
import { Material } from '../models/materiel.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MaterielsService {

  private materiels : Material[] = [
    {
      type: 'ecran',
      mark: 'Acer',
      description: "Full HD, 22'' incurvée",
      price: 700,
      nbrInStock: 9,
      added: false,
      imgUrl : 'https://www.cdiscount.com/pdt2/p/0/1/1/700x700/aceumhe0eep01/rw/ecran-pc-gamer-incurve-acer-ed270rpbiipx-27-f.jpg',
      nbreInPanier: 0
    },
    {
      type: 'pc',
      mark: 'Hp Omen',
      description: "Ecran full HD 15,6 pouce, avec un CPU i7-7700HQ, un GPU GTX 1060 6G dedié, un memoire de 1To HDD + 128SSD et un RAM de 12Go",
      price: 1200,
      nbrInStock: 2,
      added: false,
      imgUrl: 'https://www.notebookcheck.biz/uploads/tx_nbc2/61IEiK7OODL._AC_SL1500__02.jpg',
      nbreInPanier: 0
    },
    {
      type: 'uc',
      mark: 'Asus Rog',
      description: "CPU: i9-9900K, GPU: RTX 3080Ti 8G dedié, un memoire de 3To HDD + 1To SSD et un RAM de 24Go",
      price: 2400,
      nbrInStock: 5,
      added: false,
      imgUrl: 'https://i.pinimg.com/originals/07/40/aa/0740aa709801552c4027c3d1993c9275.jpg',
      nbreInPanier: 0
    },
    {
      type: 'manette',
      mark: 'Razer',
      description: "4000 dpi, 6 bouttons",
      price: 300,
      nbrInStock: 12,
      added: false,
      imgUrl: 'https://m.media-amazon.com/images/I/61SXuz2OIYL._AC_UL320_.jpg',
      nbreInPanier: 0
    }
  ];


  private materielsInStock : Material[] = [];

  public nombre: number = 0;

  materielSubject = new Subject<Material[]>();

  nombreInPannierSubject = new Subject<number>();

  constructor(private http : HttpClient) { }

  emitMaterielSubject() {
    this.materielSubject.next(this.materiels.slice());
  }
  
  emitNombreInPannierSubject(value: number = 0) {
    this.nombreInPannierSubject.next(value);
  }

  getMateriels() {
    //refa mget na mpromise de mila specifiena fona le type retourneny fa manjary mamoka anle erreur not assignable iny izy
    this.http.get<Material[]>('http://localhost:3000/').subscribe(
      (materiels) => {
        if (materiels) {
          this.materiels = materiels;
        }
      }, 
      (error) => {
        console.log('Erreur du get ' + error);
      }
    );
  }

  getOneMaterielById(id: number) {
    return new Promise<Material>(
      (resolve, reject) => { 
        this.http.get<Material>('http://localhost:3000/' + id).subscribe(
          (materiel) => {
            if(materiel) {
              resolve(materiel);
              console.log('get on successful');
            }
          },
          (error) => {
            console.log('Error ' + error);
          }
        );
      });
  }


  createNewMateriel(newMateriel : Material) {
    return new Promise<Material>(
      (resolve, reject) => {
        this.http.post<Material>('http://localhost:3000/', newMateriel).subscribe(
          (response) => {
            if(response) {
              resolve(response);
            }
          },
          (error) => {
            console.log('Error de creation du nouveau materiel ' + error);
          }
        );
      }
    );
  }

  modifyMateriel(id: number, newMateriel: Material) {
    return new Promise<Material>(
      (resolve, reject) => {
        this.http.put<Material>('http://localhost:3000/' + id, newMateriel).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            console.log('error de modicfication ' + error);
          }
        )
      });
  }

}
