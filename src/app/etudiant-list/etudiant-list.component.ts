import { Component, OnInit } from '@angular/core';
import {Etudiant} from "../models/Etudiant";
import {EtudiantService} from "../services/EtudiantService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  constructor(
    private etudiantService: EtudiantService,
    private router: Router
  ) { }

  students: Etudiant[]=[]

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.etudiantService.getData()
      .subscribe((res: any)=>{
        this.students= res
      })
  }

  sendToEdit(student: Etudiant){
    this.router.navigate(['/student/edit', student.idEtudiant])
  }
}
