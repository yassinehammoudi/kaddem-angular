import { Component, OnInit } from '@angular/core';
import {Contrat} from "../models/Contrat";
import {ContratService} from "../services/ContratService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Departement} from "../models/Departement";

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit {

  constructor(
    private contratService: ContratService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  contracts: Contrat[]= []

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.contratService.getData().subscribe((res:any)=>{
      this.contracts= res
    })
  }

  toEdit(contract: Contrat){
    this.router.navigate(['/contract/edit', contract.idContrat])
  }

  deleteContrat(id: number){
    this.contratService.deleteContrat(id).subscribe(
      res=>{
        this.showNotification()
        setTimeout(()=>window.location.reload(), 3000)

      }
    )

  }

  index: number=0
  updateDepFromChild(pos: number, newC: Contrat){
    this.contracts[pos]= newC
  }

  showNotification(){
    this.toastr.warning("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>Contract</b> has been added!",
      "Success", {})
  }
}
