export class DetailsEquipe{

  idDetailEquipe: number|null;
  salle: number;
  thematique: string;


  constructor(idDetailEquipe: number|null, salle: number, thematique: string) {
    this.idDetailEquipe = idDetailEquipe;
    this.salle = salle;
    this.thematique = thematique;
  }
}
