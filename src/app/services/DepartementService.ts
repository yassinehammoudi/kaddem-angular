import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Departement} from "../models/Departement";
import {UniversiteService} from "./UniversiteService";
import {log} from "util";


@Injectable({ providedIn: 'root' })
export class DepartementService{

  private apiUrl: string= "kaddem/dep/"
  private getAllUrl: string= "all"
  private addUrl: string= "add"
  private editUrl: string= "update"

  httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient, private uniService: UniversiteService) {
  }


  getData():Observable<Departement>{
    return this.httpClient.get<Departement>(this.apiUrl+this.getAllUrl);
  }

  addDepartement(dep: Departement):Observable<Departement>{
    // @ts-ignore
    let dep2= new Departement(0, dep.nomDepart, undefined)
    return this.httpClient.post<Departement>(this.apiUrl+this.addUrl, dep2, this.httpOptions)
  }
  editDepartement(dep: Departement):Observable<Departement>{
    // @ts-ignore
    let dep2= new Departement(dep.idDepart, dep.nomDepart, undefined)
    return this.httpClient.put<Departement>(this.apiUrl+this.editUrl, dep2, this.httpOptions)
  }


}
