import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Etudiant} from "../models/Etudiant";
import {Equipe} from "../models/Equipe";


@Injectable({ providedIn: 'root' })
export class EtudiantService{

  private apiUrl: string= "kaddem/etudiant/"
  private getAllUrl: string= "all"
  private addUrl: string= "add"
  private getOneByIdUrl: string= "get/"
  private getTeamsUrl: string= "getTeams/"
  private assignTeamsUrl: string= "assignToTeams/"
  private updateUrl: string= "update"

  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient) {
  }


  getData():Observable<Etudiant>{
    return this.httpClient.get<Etudiant>(this.apiUrl+this.getAllUrl);
  }

  getOneById(idE: number):Observable<Etudiant>{
    return this.httpClient.get<Etudiant>(this.apiUrl+this.getOneByIdUrl+idE);
  }

  addEtudiant(e: Etudiant):Observable<Etudiant>{
    return this.httpClient.post<Etudiant>(this.apiUrl+this.addUrl, e, this.httpOptions)
  }

  getTeams(e: Etudiant):Observable<Equipe>{
    return this.httpClient.get<Equipe>(this.apiUrl+this.getTeamsUrl+e.idEtudiant);
  }

  assignToTeams(e: Etudiant, ids: number[]):Observable<Equipe>{
    return this.httpClient.put<Equipe>(this.apiUrl+this.assignTeamsUrl+e.idEtudiant, ids);
  }

  editEquipe(e: Etudiant):Observable<Etudiant>{
    return this.httpClient.put<Etudiant>(this.apiUrl+this.updateUrl, e, this.httpOptions)
  }


}
