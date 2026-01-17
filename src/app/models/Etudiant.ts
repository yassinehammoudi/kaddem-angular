import {Option} from "../enums/Option";
import {Departement} from "./Departement";

export class Etudiant{

  idEtudiant: number;
  prenom: string;
  nom: string;
  optionEtudiant: Option;
  departement: Departement;


  constructor(idEtudiant: number, prenom: string, nom: string, optionEtudiant: Option, departement: Departement) {
    this.idEtudiant = idEtudiant;
    this.prenom = prenom;
    this.nom = nom;
    this.optionEtudiant = optionEtudiant;
    this.departement = departement;
  }
}
