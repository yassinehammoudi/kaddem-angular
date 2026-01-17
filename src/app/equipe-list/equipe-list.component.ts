import { Component, OnInit } from '@angular/core';
import {Equipe} from "../models/Equipe";
import {EquipeService} from "../services/EquipeService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent implements OnInit {

  teams: Equipe[]= []

  constructor(
    private equipeService: EquipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTeams()
  }

  getTeams():void{
    this.equipeService.getData().subscribe((res:any)=> {
      this.teams = res
    })
  }

  sendToEdit(team: Equipe){
    this.router.navigate(['/team/edit', team.idEquipe])
  }

}
