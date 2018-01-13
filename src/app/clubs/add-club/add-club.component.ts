import { Component, OnInit, ViewEncapsulation,
                                    ViewChild }   from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, FormControl, 
         Validators, FormBuilder, FormArray }     from '@angular/forms';
import { ApiService }                             from '../../api.service';
import { RouterModule, Router, ActivatedRoute }   from '@angular/router';
import { HttpErrorResponse }                      from '@angular/common/http';
import { ClubComponent }                          from '../club/club.component';
import { VenuesComponent }                        from '../../venues/venues.component';

@Component({
  selector:      'app-add-club',
  templateUrl:   './add-club.component.html',
  styleUrls:     ['./add-club.component.css'],
  encapsulation: ViewEncapsulation.None,  
  providers:     [ApiService]
})


export class AddClubComponent implements OnInit {
  private addClubForm: FormGroup;
  private clubName: FormControl;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private sub: any;
  private idClub: number;
  private homeVenue: string = "My Place";
  private venues: [Object];
  private editMode: boolean         = false;
  private showVenues: boolean       = false;
  @ViewChild(ClubComponent) clubComponent;
  @ViewChild(VenuesComponent) venuesComponent;

  constructor(  private apiService: ApiService,  
                private router: Router, 
                private route: ActivatedRoute,
                private fb: FormBuilder) { 
  }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        /* If this component was called with a parameter then 
        the form needs to be pre-filled and set to edit mode */
        if(+params['id']){
          this.idClub = +params['id'];
          this.editMode = true;
          this.clubComponent.getClubDetails(+params['id']);
        }
      this.createFormControls();
      this.createForm();
    });
  }

    /* The clubComponent sends details of the Club */
  receiveClubDetails($event){
    this.clubName['text'] = $event.name;
    this.homeVenue = $event.venueName;
  }

  receiveVenuesList($event){ 
    this.venues = $event;
  }

  createForm() {
    this.addClubForm = this.fb.group({
      clubName:       this.clubName,
      homeVenue:      this.homeVenue
    });       
  }

  createFormControls() {
    this.clubName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  submitForm(formDetails){
    let body = {name: formDetails.clubName};  
    this.apiService.postData('/api/clubs/add', body).subscribe(data => {
        this.router.navigateByUrl('/clubs');
    },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.router.navigateByUrl('/clubs');
        }
    });
  }

}

