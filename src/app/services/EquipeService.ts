import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Equipe} from "../models/Equipe";


@Injectable({ providedIn: 'root' })
export class EquipeService{

  private apiUrl: string= "kaddem/equipe/"
  private getAllUrl: string= "all"
  private addUrl: string= "add"
  private getOneByIdUrl: string= "get/"
  private updateUrl: string= "update"

  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient) {
  }


  getData():Observable<Equipe>{
    return this.httpClient.get<Equipe>(this.apiUrl+this.getAllUrl);
  }

  getOneById(idEq: number):Observable<Equipe>{
  return this.httpClient.get<Equipe>(this.apiUrl+this.getOneByIdUrl+idEq);
  }

  addEquipe(eq: Equipe):Observable<Equipe>{
    return this.httpClient.post<Equipe>(this.apiUrl+this.addUrl, eq, this.httpOptions)
  }

  editEquipe(eq: Equipe):Observable<Equipe>{
    return this.httpClient.put<Equipe>(this.apiUrl+this.updateUrl, eq, this.httpOptions)
  }


}
