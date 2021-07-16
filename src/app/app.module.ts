import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterielsListComponent } from './materiels-list/materiels-list.component';
import { SingleMaterielComponent } from './materiels-list/single-materiel/single-materiel.component';
import { MaterielFormComponent } from './materiels-list/materiel-form/materiel-form.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PanierComponent } from './panier/panier.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    MaterielsListComponent,
    SingleMaterielComponent,
    MaterielFormComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    NotFoundComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    ...MaterialModules
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
