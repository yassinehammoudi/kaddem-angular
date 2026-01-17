import {DetailsEquipe} from "./DetailsEquipe";
import {Niveau} from "../enums/Niveau";

export class Equipe{

  idEquipe: number;
  nomEquipe: string;
  niveau: Niveau;

  detailEquipe: DetailsEquipe;


  constructor(idEquipe: number, nomEquipe: string, niveau: Niveau, details: DetailsEquipe) {
    this.idEquipe = idEquipe;
    this.nomEquipe = nomEquipe;
    this.niveau = niveau;
    this.detailEquipe = details;
  }
}
