import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { AlertModule }                      from 'ngx-bootstrap';
import { HttpClientModule }                 from '@angular/common/http';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersistenceModule }                from 'angular-persistence';
import { MatSelectModule }                  from '@angular/material/select';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';

import { AppComponent }                from './app.component';
import { UmpiresComponent }            from './umpires/umpires.component';
import { AddUmpireComponent }          from './umpires/add-umpire/add-umpire.component';
import { ClubsComponent }              from './clubs/clubs.component';
import { NotFoundComponent }           from './not-found/not-found.component';
import { NavBarComponent }             from './nav-bar/nav-bar.component';
import { UmpireComponent }             from './umpire/umpire.component';
import { AccreditationComponent }      from './accreditation/accreditation.component';
import { AddAccreditationComponent }   from './accreditation/add-accreditation/add-accreditation.component';
import { DeleteUmpireComponent }       from './umpires/delete-umpire/delete-umpire.component';
import { ClubComponent }               from './clubs/club/club.component';
import { DeleteClubComponent }         from './clubs/delete-club/delete-club.component';
import { VenuesComponent }             from './venues/venues.component';
import { AddVenueComponent }           from './venues/add-venue/add-venue.component';
import { DeleteVenueComponent }        from './venues/delete-venue/delete-venue.component';
import { VenueComponent }              from './venues/venue/venue.component';
import { GradesComponent }             from './grades/grades.component';
import { GradeComponent }              from './grades/grade/grade.component';
import { AddGradeComponent }           from './grades/add-grade/add-grade.component';
import { DeleteGradeComponent }        from './grades/delete-grade/delete-grade.component';
import { DeleteAccreditationComponent }from './accreditation/delete-accreditation/delete-accreditation.component';
import { TeamsComponent }              from './teams/teams.component';
import { TeamComponent }               from './teams/team/team.component';
import { AddTeamComponent }            from './teams/add-team/add-team.component';
import { DeleteTeamComponent }         from './teams/delete-team/delete-team.component';
import { DeleteEntityComponent }       from './delete-entity/delete-entity.component';

@NgModule({
  declarations: [
    AppComponent,                     
    AddUmpireComponent,
    ClubsComponent,
    NotFoundComponent,
    NavBarComponent,
    UmpireComponent,
    UmpiresComponent,
    AccreditationComponent,
    AddAccreditationComponent,
    DeleteUmpireComponent,
    ClubComponent,
    DeleteClubComponent,
    VenuesComponent,
    AddVenueComponent,
    DeleteVenueComponent,
    VenueComponent,
    GradesComponent,
    GradeComponent,
    AddGradeComponent,
    DeleteGradeComponent,
    DeleteAccreditationComponent,
    TeamsComponent,
    TeamComponent,
    AddTeamComponent,
    DeleteTeamComponent,
    DeleteEntityComponent
  ],
  imports: [
    FormsModule,                               
    ReactiveFormsModule,  
    BrowserModule,
    AlertModule.forRoot(),
    HttpClientModule,
    PersistenceModule,
    MatSelectModule,
    BrowserAnimationsModule,
    //More specifcic routes defined first )i.e with params)
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'accreditation/add', component: AddAccreditationComponent},
      {path: 'accreditation', component: AccreditationComponent},      
      {path: 'clubs/:id', component: ClubComponent},
      {path: 'clubs/add', component: ClubComponent},     
      {path: 'clubs/delete/:id', component: DeleteEntityComponent},
      {path: 'clubs', component: ClubsComponent},    
      {path: 'umpires/:id', component: UmpireComponent},
      {path: 'umpires/add', component: AddUmpireComponent},
      {path: 'umpires', component: UmpiresComponent},
      {path: 'umpires/delete/:id', component: DeleteEntityComponent},
      {path: 'venues/:id', component: VenueComponent},
      {path: 'venues/add', component: AddVenueComponent},
      {path: 'venues', component: VenuesComponent},
      {path: 'venues/delete/:id', component: DeleteEntityComponent},
      {path: 'grades/:id', component: GradeComponent},
      {path: 'grades/add', component: GradeComponent},
      {path: 'grades', component: GradesComponent},
      {path: 'grades/delete/:id', component: DeleteEntityComponent},
      {path: '**', component: NotFoundComponent}])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
