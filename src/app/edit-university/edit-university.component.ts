import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Universite} from "../models/Universite";
import {UniversiteService} from "../services/UniversiteService";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent implements OnInit {

  constructor(
    private uniService: UniversiteService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  @Input() parentUni!: Universite;

  @Output() uniEvent= new EventEmitter<Universite>();
  @Output() editedEvent= new EventEmitter<boolean>();

  university: Universite=new Universite(0, "", [])

  ngOnInit(): void {
    this.university= Object.assign({}, this.parentUni)
  }

  updateUni(){
    this.uniService.editUiversite(this.university)
      .subscribe(res=> {
        this.parentUni = this.university
        this.showNotification()
        this.uniEvent.emit(this.parentUni)
        this.editedEvent.emit(false)
      })
  }


  showNotification(){
    this.toastr.info("<span class='tim-icons icon-check-2' [data-notify]='icon'></span><b>" + this.university.nom+
      "</b> has been updated!",
      "Success", {})
  }
}
