import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MaterielFormComponent } from './materiels-list/materiel-form/materiel-form.component';
import { MaterielsListComponent } from './materiels-list/materiels-list.component';
import { SingleMaterielComponent } from './materiels-list/single-materiel/single-materiel.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanierComponent } from './panier/panier.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { 
    path: 'materiels-list',
    children: [
      {
        path: '', 
        canActivate : [AuthGuardService],
        component: MaterielsListComponent,
      },
      {
        path: 'materiel-form',
        canActivate : [AuthGuardService],
        component: MaterielFormComponent,
      },
      { 
        path: 'single-materiel',
        canActivate : [AuthGuardService],
        component: SingleMaterielComponent
      },
    ]
  },
  {
    path: 'auth', 
    children: [
      { 
        path: '',
        component: SigninComponent
      },
      { 
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
  {
    path: 'panier',
    canActivate : [AuthGuardService],
    component: PanierComponent
  },
  { 
    path: '',
    component: SigninComponent
  },
  { 
    path: '**', 
    redirectTo: 'auth/signin/'
  },
  { 
    path: 'not-found',
    component: NotFoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
