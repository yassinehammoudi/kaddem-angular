import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversiteListComponent } from './universite-list/universite-list.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {NgbCollapseModule, NgbDate, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import { AddUniversiteComponent } from './add-universite/add-universite.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DepartementListComponent } from './departement-list/departement-list.component';
import { AddDepartementComponent } from './add-departement/add-departement.component';
import { EditDepartementComponent } from './edit-departement/edit-departement.component';
import { EquipeListComponent } from './equipe-list/equipe-list.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ContratListComponent } from './contrat-list/contrat-list.component';
import { AddContratComponent } from './add-contrat/add-contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';
import { EditUniversityComponent } from './edit-university/edit-university.component';
import { ArchiveContratComponent } from './archive-contrat/archive-contrat.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversiteListComponent,
    HomeComponent,
    SideBarComponent,
    NavbarComponent,
    AdminLayoutComponent,
    AddUniversiteComponent,
    DepartementListComponent,
    AddDepartementComponent,
    EditDepartementComponent,
    EquipeListComponent,
    AddEquipeComponent,
    EditEquipeComponent,
    ContratListComponent,
    AddContratComponent,
    EditContratComponent,
    EtudiantListComponent,
    AddEtudiantComponent,
    EditEtudiantComponent,
    EditUniversityComponent,
    ArchiveContratComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCollapseModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      autoDismiss: false,
      timeOut: 2000,
      maxOpened: 5,
      //newestOnTop: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-top-center',
      enableHtml: true,


    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
