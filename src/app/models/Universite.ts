import {Departement} from "./Departement";

export class Universite{

  idUniv: number;
  nom: string;

  departements: Departement[];


  constructor(idUniv: number, nom: string, departements: Departement[]) {
    this.idUniv = idUniv;
    this.nom = nom;
    this.departements = departements;
  }
}
