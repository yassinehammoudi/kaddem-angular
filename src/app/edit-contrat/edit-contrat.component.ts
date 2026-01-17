import { Component, OnInit } from '@angular/core';
import {ContratService} from "../services/ContratService";
import {ActivatedRoute, Router} from "@angular/router";
import {Validators} from "@angular/forms";
import {Contrat} from "../models/Contrat";
import {Specialite} from "../enums/Specialite";
import {ToastrService} from "ngx-toastr";
import {EtudiantService} from "../services/EtudiantService";
import {Etudiant} from "../models/Etudiant";

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.css']
})
export class EditContratComponent implements OnInit {

  constructor(
    private contratService: ContratService,
    private ac: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private etService: EtudiantService
  ) { }



  ngOnInit(): void {
    this.loadData()
  }


  dateDeb= {year:0, month:0, day:0}
  dateFin= {year:0, month:0, day:0}

  // @ts-ignore
  contract: Contrat= new Contrat(0, new Date(), new Date(), Specialite.IA, false, 0)

  specialties= Object.values(Specialite)

  students: Etudiant[]= []

  loadData(){

    this.ac.params.subscribe((param:any)=> {
      let id = param['idC']
      this.contratService.getOneById(id).subscribe((res:any)=>{
        this.contract= res

        if (!this.contract.etudiant)
          { // @ts-ignore
            this.contract.etudiant= new Etudiant(0)
          }
        console.log(this.contract)
        this.dateDeb={
          year: new Date(this.contract.dateDebutContrat).getFullYear(),
          month: new Date(this.contract.dateDebutContrat).getMonth()+1,
          day: new Date(this.contract.dateDebutContrat).getDay(),
        }
        this.dateFin={
          year: new Date(this.contract.dateFinContrat).getFullYear(),
          month: new Date(this.contract.dateFinContrat).getMonth()+1,
          day: new Date(this.contract.dateFinContrat).getDay(),
        }
        })
      })

    this.etService.getData().subscribe((res:any)=> {
      this.students = res
    })
  }

  updateContract(){
    this.contract.dateDebutContrat= new Date(this.dateDeb.year,this.dateDeb.month,this.dateDeb.day)
    this.contract.dateFinContrat= new Date(this.dateFin.year,this.dateFin.month,this.dateFin.day)
    this.contratService.editContrat(this.contract)
      .subscribe(res=>{
        this.showNotification()
        this.router.navigate(['/contract/list'])
      })
  }

  showNotification(){
    this.toastr.info("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>" +
      "</b>The contract has been updated!",
      "Success", {})
  }

}
