import {Universite} from "./Universite";

export class Departement{

  idDepart: number;
  nomDepart: string;

  universite: Universite;


  constructor(idDepart: number, nomDepart: string, universite: Universite) {
    this.idDepart = idDepart;
    this.nomDepart = nomDepart;
    this.universite = universite;
  }
}
