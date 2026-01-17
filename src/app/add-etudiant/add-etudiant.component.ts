import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EtudiantService} from "../services/EtudiantService";
import {Etudiant} from "../models/Etudiant";
import {Option} from "../enums/Option";
import {EquipeService} from "../services/EquipeService";
import {DepartementService} from "../services/DepartementService";
import {Departement} from "../models/Departement";
import {Equipe} from "../models/Equipe";

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private etService: EtudiantService,
    private depService: DepartementService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  student: Etudiant | undefined

  options= Object.values(Option).filter(value=> typeof value!=='number')
  departments: Departement[]=[]


  studentForm= this.fb.group({
    prenom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    nom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    optionEtudiant: [Option.GAMIX, Validators.required],
    department: [null, Validators.required]
  })

  get prenom(){
    return this.studentForm.get('prenom')
  }

  get nom(){
    return this.studentForm.get('nom')
  }
  get optionEtudiant(){
    return this.studentForm.get('optionEtudiant')
  }
  get department(){
    return this.studentForm.get('department')
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.depService.getData()
      .subscribe((res:any)=>{
        this.departments= res
      })
  }



  addEtudiant(){
    this.student= new Etudiant(0, this.studentForm.value.prenom,
      this.studentForm.value.nom,this.studentForm.value.optionEtudiant,
      // @ts-ignore
      new Departement( this.studentForm.value.department))
    console.log(this.student)
    this.etService.addEtudiant(this.student)
      .subscribe(res=>{
        this.showNotification()
        this.router.navigate(['student/list'])
        }
      )
  }


  showNotification(){
    this.toastr.info("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>" + this.studentForm.value.prenom+
      this.studentForm.value.nom+ "</b> has been added!",
      "Success", {})
  }
}
