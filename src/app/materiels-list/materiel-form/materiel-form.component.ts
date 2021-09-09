import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/materiel.model';
import { MaterielsService } from 'src/app/services/materiels.service';
// import {MatFormFieldModule} from '@angular/material/form-field';

// import { MaterialModules } from '../../material';

@Component({
  selector: 'app-materiel-form',
  templateUrl: './materiel-form.component.html',
  styleUrls: ['./materiel-form.component.scss']
})
export class MaterielFormComponent implements OnInit {

  materielForm : FormGroup = new FormGroup({});
  materiels : Material[] = [];

  constructor(private formBuilder : FormBuilder, private materielsService: MaterielsService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.materielForm = this.formBuilder.group({
      type: ['', Validators.required],
      marque: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      nbreDansStocks: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSaveProducts() {
    const formValue = this.materielForm.value;

    const type = this.materielForm.get('type')?.value;
    console.log('type : ' , type)
    const marque = this.materielForm.get('marque')?.value;
    const description = this.materielForm.get('description')?.value;
    const prix = this.materielForm.get('prix')?.value;
    const nbreDansStocks = this.materielForm.get('nbreDansStocks')?.value;
    const image = this.materielForm.get('image')?.value;

    const newProduct = new Material(type, marque, description, prix, nbreDansStocks, image, false, 0);
    console.log('tao anaty form : ' , newProduct)
    this.materielsService.createNewMateriel(newProduct);
    this.materielsService.getMateriels().then(
      (data :any[]) => {
        console.log('materials data : ', data);
        this.materiels = data;
        this.materielsService.emitMaterielSubject(this.materiels)
      });
    console.log('new', this.materiels);
    // this.materielsService.emitMaterielSubject(this.materiels);
    this.router.navigate(['materiels-list']);
  }
}
