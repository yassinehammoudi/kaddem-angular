import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contrat} from "../models/Contrat";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {DepartementService} from "../services/DepartementService";
import {ContratService} from "../services/ContratService";

@Component({
  selector: 'app-archive-contrat',
  templateUrl: './archive-contrat.component.html',
  styleUrls: ['./archive-contrat.component.css']
})
export class ArchiveContratComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private contratService: ContratService,
  ) { }

  @Input() parentContrat!: Contrat

  @Output() contrtEvent= new EventEmitter<Contrat>()

  // @ts-ignore
  contrat: Contrat= new Contrat()

  ngOnInit(): void {
    this.contrat= Object.assign({}, this.parentContrat)
  }

  updateC(){
    this.contrat.archive= true
    console.log(this.contrat)
    this.contratService.editContrat(this.contrat).subscribe(res=>{
      this.parentContrat= this.contrat
      this.showNotification()
      this.contrtEvent.emit(this.contrat)
    })
  }

  showNotification(){
    this.toastr.success("<span class='tim-icons icon-check-2' [data-notify]='icon'></span><b>" +
      "This contract</b> has been updated!",
      "Success", {})
  }
}
