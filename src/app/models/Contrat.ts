import {Specialite} from "../enums/Specialite";
import {Etudiant} from "./Etudiant";

export class Contrat{

  idContrat: number;
  dateDebutContrat: Date;
  dateFinContrat: Date;
  specialite: Specialite;
  archive: boolean;
  montantContrat: number;
  etudiant: Etudiant;


  constructor(idContrat: number, dateDebutContrat: Date, dateFinContrat: Date, specialite: Specialite, archive: boolean, montantContrat: number, etudiant: Etudiant) {
    this.idContrat = idContrat;
    this.dateDebutContrat = dateDebutContrat;
    this.dateFinContrat = dateFinContrat;
    this.specialite = specialite;
    this.archive = archive;
    this.montantContrat = montantContrat;
    this.etudiant= etudiant;
  }
}
