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
import { ClubsComponent }              from './clubs/clubs.component';
import { NotFoundComponent }           from './not-found/not-found.component';
import { NavBarComponent }             from './nav-bar/nav-bar.component';
import { UmpireComponent }             from './umpires/umpire/umpire.component';
import { AccreditationsComponent }     from './accreditations/accreditations.component';
import { AccreditationComponent }      from './accreditations/accreditation/accreditation.component';
import { ClubComponent }               from './clubs/club/club.component';
import { VenuesComponent }             from './venues/venues.component';
import { VenueComponent }              from './venues/venue/venue.component';
import { GradesComponent }             from './grades/grades.component';
import { GradeComponent }              from './grades/grade/grade.component';
import { TeamsComponent }              from './teams/teams.component';
import { TeamComponent }               from './teams/team/team.component';
import { DeleteEntityComponent }       from './delete-entity/delete-entity.component';

@NgModule({
  declarations: [
    AppComponent,                     
    ClubsComponent,
    NotFoundComponent,
    NavBarComponent,
    UmpireComponent,
    UmpiresComponent,
    AccreditationsComponent,
    AccreditationComponent,
    ClubComponent,
    VenuesComponent,
    VenueComponent,
    GradesComponent,
    GradeComponent,
    TeamsComponent,
    TeamComponent,
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
      {path: 'accreditations/:id', component: AccreditationComponent},
      {path: 'accreditations/add', component: AccreditationComponent},
      {path: 'accreditations', component: AccreditationsComponent},   
      {path: 'accreditations/delete/:id', component: DeleteEntityComponent},   
      {path: 'clubs/:id', component: ClubComponent},
      {path: 'clubs/add', component: ClubComponent},     
      {path: 'clubs/delete/:id', component: DeleteEntityComponent},
      {path: 'clubs', component: ClubsComponent},    
      {path: 'umpires/:id', component: UmpireComponent},
      {path: 'umpires/add', component: UmpireComponent},
      {path: 'umpires', component: UmpiresComponent},
      {path: 'umpires/delete/:id', component: DeleteEntityComponent},
      {path: 'venues/:id', component: VenueComponent},
      {path: 'venues/add', component: VenueComponent},
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
