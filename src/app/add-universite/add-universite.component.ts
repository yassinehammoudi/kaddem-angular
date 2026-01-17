import { Component, OnInit } from '@angular/core';
import {Universite} from "../models/Universite";
import {UniversiteService} from "../services/UniversiteService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-universite',
  templateUrl: './add-universite.component.html',
  styleUrls: ['./add-universite.component.css']
})
export class AddUniversiteComponent implements OnInit {

  constructor(private universiteService: UniversiteService, private router: Router) { }

  uni: Universite= new Universite(0, "", [])

  ngOnInit(): void {
  }

  addUni():void{
    this.universiteService.addUiversite(this.uni).subscribe(
      res=>this.router.navigate(['/university/list'])
    )
  }

}
