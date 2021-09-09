import { Material } from '../models/materiel.model';

export interface Panier {
    materiels: Material[];
    nombreDeCommande: number;
}