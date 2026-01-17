import { Component, OnInit } from '@angular/core';
import {Equipe} from "../models/Equipe";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Niveau} from "../enums/Niveau";
import {EquipeService} from "../services/EquipeService";
import {DetailsEquipe} from "../models/DetailsEquipe";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.css']
})
export class AddEquipeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private eqService: EquipeService,
    private router: Router,
    private toastr: ToastrService
  ) {


  }

  ngOnInit(): void {}


  team: Equipe | undefined;

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

  addEquipe():void{
    this.team= new Equipe(0,this.teamForm.value.nomEquipe, this.teamForm.value.niveau,
      new DetailsEquipe(null, this.teamForm.value.detailEquipe.salle, this.teamForm.value.detailEquipe.thematique))
    this.eqService.addEquipe(this.team).subscribe(res=> {
      this.showNotification()
      this.router.navigate(['team/list'])
    })
  }

  showNotification(){
    this.toastr.info("<span class='tim-icons icon-simple-add' [data-notify]='icon'></span><b>" + this.teamForm.value.nomEquipe+
      "</b> has been added!",
      "Success", {})
  }

}
