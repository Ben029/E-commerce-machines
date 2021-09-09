import { Injectable } from '@angular/core';
import { Material } from '../models/materiel.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MaterielsService {

  private materiels : Material[] = [];
  private materielsInStock : Material[] = [];
  apiUrl : string = 'http://localhost:3000/api/materiels';

  public nombre: number = 0;

  materielSubject = new Subject<Material[]>();

  nombreInPannierSubject = new Subject<number>();

  constructor(private http : HttpClient) { }

  emitMaterielSubject(materiels : Material[]) {
    this.materielSubject.next(materiels);
  }
  
  emitNombreInPannierSubject(value: number = 0) {
    this.nombreInPannierSubject.next(value);
  }

  getMateriels() : Promise<Material[]> {
    //refa mget na mpromise de mila specifiena fona le type retourneny fa manjary mamoka anle erreur not assignable iny izy
    return <Promise<Material[]>> this.http.get<Material[]>(`${this.apiUrl}`).toPromise();
  }

  createNewMateriel(newMateriel : Material) {
    return <Promise<Material>> this.http.post<Material>(`${this.apiUrl}`, newMateriel).toPromise();
  }

  updateMateriel(id: string, newMateriel : Material) {
    return <Promise<Material>> this.http.put<Material>(`${this.apiUrl}/` + id, newMateriel).toPromise();
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
