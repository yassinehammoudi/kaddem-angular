import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UniversiteService} from "./UniversiteService";
import {Contrat} from "../models/Contrat";


@Injectable({ providedIn: 'root' })
export class ContratService{

  private apiUrl: string= "kaddem/contrat/"
  private getAllUrl: string= "all"
  private addUrl: string= "add"
  private oneByIdUrl: string= "get"
  private editUrl: string= "update"
  private deleteUrl: string= "remove/"

  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient, private uniService: UniversiteService) {
  }


  getData():Observable<Contrat>{
      return this.httpClient.get<Contrat>(this.apiUrl+this.getAllUrl);
  }

  getOneById(idC: number):Observable<Contrat>{
    return this.httpClient.get<Contrat>(this.apiUrl+this.oneByIdUrl+'/'+idC);
  }

  addContrat(contrat: Contrat):Observable<Contrat>{
    return this.httpClient.post<Contrat>(this.apiUrl+this.addUrl, contrat, this.httpOptions)
  }
  editContrat(contrat: Contrat):Observable<Contrat>{

    return this.httpClient.put<Contrat>(this.apiUrl+this.editUrl, contrat, this.httpOptions)
  }

  deleteContrat(id: number):Observable<Contrat>{
    return this.httpClient.delete<Contrat>(this.apiUrl+this.deleteUrl+id);
  }

}
