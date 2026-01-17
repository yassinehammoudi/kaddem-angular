import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ContratService} from "../services/ContratService";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Specialite} from "../enums/Specialite";
import {Contrat} from "../models/Contrat";
import {EtudiantService} from "../services/EtudiantService";
import {Etudiant} from "../models/Etudiant";

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {

  constructor(
    private router: Router,
    private contratService: ContratService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private etService: EtudiantService
  ) { }

  dateDeb= {year:0, month:0, day:0}
  dateFin= {year:0, month:0, day:0}

  // @ts-ignore
  contract: Contrat= new Contrat(0, new Date(), new Date(), Specialite.IA, false, 0,new Etudiant(0))

  specialties= Object.values(Specialite)
  students: Etudiant[]= []

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.etService.getData().subscribe((res:any)=> {
      this.students = res
    })
  }

  addContrat(){
    this.contract.dateDebutContrat= new Date(this.dateDeb.year,this.dateDeb.month,this.dateDeb.day)
    this.contract.dateFinContrat= new Date(this.dateFin.year,this.dateFin.month,this.dateFin.day)
    console.log(this.contract)
    this.contratService.addContrat(this.contract)
      .subscribe(res=>{
        this.showNotification()
        this.router.navigate(['/contract/list'])
      })
  }


  showNotification(){
    this.toastr.info("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>" +
      "</b>The contract has been created!",
      "Success", {})
  }
}
