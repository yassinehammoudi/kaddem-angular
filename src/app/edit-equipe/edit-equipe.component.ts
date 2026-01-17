import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {EquipeService} from "../services/EquipeService";
import {ActivatedRoute, Router} from "@angular/router";
import {Equipe} from "../models/Equipe";
import {Niveau} from "../enums/Niveau";
import {DetailsEquipe} from "../models/DetailsEquipe";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-equipe',
  templateUrl: './edit-equipe.component.html',
  styleUrls: ['./edit-equipe.component.css']
})
export class EditEquipeComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private eqService: EquipeService,
              private router: Router,
              private ac: ActivatedRoute,
              private toastr: ToastrService
              ) { }

  // @ts-ignore
  team: Equipe = new Equipe();

  levels= Object.values(Niveau).filter(value=> typeof value!=='number')

  teamForm=this.fb.group({
    nomEquipe: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    niveau: [Niveau.JUNIOR, Validators.required],

    detailEquipe: this.fb.group({
      salle: [0, Validators.compose([Validators.required, Validators.min(1)])],
      thematique: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    })

  })

  get nomEquipe() {
    return this.teamForm.get('nomEquipe');
  }
  get niveau() {
    return this.teamForm.get('niveau');
  }
  get salle() {
    return this.teamForm.get('detailEquipe')!.get('salle');
  }
  get thematique() {
    return this.teamForm.get('detailEquipe')!.get('thematique');
  }

  ngOnInit(): void {
    // @ts-ignore

    this.getEquipe()
  }



  getEquipe():void{
    let id
    this.ac.params.subscribe((param:any)=> {
      id = param['idEq']
      this.eqService.getOneById(id).subscribe((res:any)=>{
        this.team= res

        this.teamForm=this.fb.group({
          nomEquipe: [this.team.nomEquipe, Validators.compose([Validators.required, Validators.minLength(3)])],
          niveau: [this.team.niveau, Validators.required],

          detailEquipe: this.fb.group({
            salle: [this.team.detailEquipe.salle, Validators.compose([Validators.required, Validators.min(1)])],
            thematique: [this.team.detailEquipe.thematique, Validators.compose([Validators.required, Validators.minLength(3)])],
          })

        })


      })
    })
  }

  editEquipe(){
    this.team= new Equipe(this.team.idEquipe,this.teamForm.value.nomEquipe, this.teamForm.value.niveau,
      new DetailsEquipe(this.team.detailEquipe.idDetailEquipe, this.teamForm.value.detailEquipe.salle, this.teamForm.value.detailEquipe.thematique))

    this.eqService.editEquipe(this.team).subscribe(res=> {
        this.showNotification()
        this.router.navigate(['team/list'])
      })
  }

  showNotification(){
    this.toastr.info("<span class='tim-icons icon-check-2' [data-notify]='icon'></span><b>" + this.teamForm.value.nomEquipe+
      "</b> has been updated!",
      "Success", {})
  }

}
