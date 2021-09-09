import { Material } from "./materiel.model";
import { Panier } from "./panier.model";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    panier : Panier;
    wallet: number;
    isAuth: boolean;
    image: string;
};