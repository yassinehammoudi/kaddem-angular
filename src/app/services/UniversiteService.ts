import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Universite} from "../models/Universite";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class UniversiteService{

  private apiUrl: string= "kaddem/universite/"
  private getAllUrl: string= "all"
  private addUrl: string= "add"
  private assignUrl: string= "assign/"
  private editUrl: string= "update"

  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient) {
  }


  getData():Observable<Universite>{
    return this.httpClient.get<Universite>(this.apiUrl+this.getAllUrl);
  }

  addUiversite(uni: Universite):Observable<Universite>{
    return this.httpClient.post<Universite>(this.apiUrl+this.addUrl, uni, this.httpOptions)
  }

  editUiversite(uni: Universite):Observable<Universite>{
    return this.httpClient.put<Universite>(this.apiUrl+this.editUrl, uni, this.httpOptions)
  }

  assignUniToDep(uniId: number, depId: number):Observable<Universite>{
    return this.httpClient.put<Universite>(this.apiUrl+this.assignUrl+uniId+"/"+depId, null, this.httpOptions)
  }
}
