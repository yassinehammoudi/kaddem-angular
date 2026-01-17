import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {Departement} from "../models/Departement";
import {Universite} from "../models/Universite";
import {UniversiteService} from "../services/UniversiteService";
import {DepartementService} from "../services/DepartementService";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit{

  constructor(
    private uniService: UniversiteService,
    private depService: DepartementService,
    private toastr: ToastrService
    ) { }

  @Input() parentDep!: Departement;

  @Output() depEvent= new EventEmitter<Departement>();
  @Output() editedEvent= new EventEmitter<boolean>();
  // @ts-ignore
  dep: Departement;


  universities: Universite[]= []

  ngOnInit(): void {
    this.dep= Object.assign({}, this.parentDep)
    this.getUniversities()
  }

  getUniversities(): void{
    this.uniService.getData()
      .subscribe((res: any)=> {
        this.universities = res
      })
  }


  updateDep(){
    this.dep.universite=this.universities.find(uni=> uni.idUniv==this.dep.universite.idUniv)!
    this.depService.editDepartement(this.dep)
      .subscribe(res=> {
          this.uniService.assignUniToDep(this.dep.universite.idUniv, res.idDepart)
            .subscribe(res=> {
              this.parentDep= this.dep
              this.showNotification()
              this.depEvent.emit(this.parentDep)
              this.editedEvent.emit(false)
            })
        }
      )
  }

  showNotification(){
    this.toastr.success("<span class='tim-icons icon-check-2' [data-notify]='icon'></span><b>" + this.dep.nomDepart+
      "</b> has been updated!",
      "Success", {})
  }

}
