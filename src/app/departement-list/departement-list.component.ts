import { Component, OnInit } from '@angular/core';
import {Departement} from "../models/Departement";
import {DepartementService} from "../services/DepartementService";
import { log } from 'console';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  constructor(private depService: DepartementService) { }

  departments:Departement[]=[]

  isEdit: boolean[]=[]
  index=0

  ngOnInit(): void {
    this.getDeps()
  }

  getDeps():void{
    this.depService.getData().subscribe((res:any)=> {
      console.log(res)
      this.departments = res
      this.isEdit= new Array<boolean>(res.length)
      this.isEdit.fill(false)
    })
  }

  setEdit(pos: number){
    this.isEdit[pos]= !this.isEdit[pos]
  }

  updateDepFromChild(pos: number, newDep: Departement){
    this.departments[pos]= newDep
  }

}
