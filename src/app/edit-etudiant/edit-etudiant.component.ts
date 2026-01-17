import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Option} from "../enums/Option";
import {EtudiantService} from "../services/EtudiantService";
import {EquipeService} from "../services/EquipeService";
import {DepartementService} from "../services/DepartementService";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Etudiant} from "../models/Etudiant";
import {Departement} from "../models/Departement";
import {Equipe} from "../models/Equipe";
import {getLocaleFirstDayOfWeek} from "@angular/common";
import {log} from "util";

@Component({
  selector: 'app-edit-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.css']
})
export class EditEtudiantComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private etService: EtudiantService,
    private eqService: EquipeService,
    private depService: DepartementService,
    private router: Router,
    private ac: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  // @ts-ignore
  student: Etudiant= new Etudiant(0, "", "", "", new Departement(0))
  studentEquipes: Equipe[]=[]

  options= Object.values(Option).filter(value=> typeof value!=='number')
  departments: Departement[]=[]
  teams: Equipe[]=[]

  ngOnInit(): void {
    this.loadData()
  }




  selectedID: number=0;
  selectedTeam: any;
  addTeamSelection(){
    this.selectedTeam= this.teams.find(t=> t.idEquipe== this.selectedID)
    this.teams.splice( this.teams.indexOf(this.selectedTeam), 1)
    this.studentEquipes.push(this.selectedTeam)
    this.selectedID=0
  }

  removeTeam(equipe: Equipe){
    this.studentEquipes.splice( this.teams.indexOf(equipe), 1)
    this.teams.push(equipe)
  }

  loadData(){
    this.eqService.getData()
      .subscribe((res:any)=>{
        this.teams= res
      })

    this.depService.getData()
      .subscribe((res:any)=>{
        this.departments= res
      })

    this.ac.params.subscribe((param:any)=>{
      let id= param['idE']
      this.etService.getOneById(id).subscribe((res:any)=>{
        this.student= res
        this.etService.getTeams(this.student).subscribe((res1:any)=>{
          this.studentEquipes= res1
          this.studentEquipes.forEach(e=> {
            this.teams.splice(this.teams.findIndex(ee=>ee.idEquipe==e.idEquipe), 1)
            }
          )
        })
      })

    })
  }

  updateEtudiant(){

    this.etService.editEquipe(this.student).subscribe(
      res=>{
        let ids: number[]=[]
        this.studentEquipes.forEach(e=>ids.push(e.idEquipe))
        this.etService.assignToTeams(this.student, ids).subscribe(res=>{
          this.showNotification()
          this.router.navigate(['/student/list'])
        })
      }
    )
  }


  showNotification(){
    this.toastr.info("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>" + this.student.prenom+
      this.student.nom+ "</b> has been updated!",
      "Success", {})
  }
}
