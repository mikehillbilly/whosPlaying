import { Component, OnInit, ViewEncapsulation, 
		     Output, OnDestroy, EventEmitter } 	  	from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, FormControl, 
         Validators, FormBuilder, FormArray }   from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse }                    from '@angular/common/http';
import { ApiService }                           from '../../api.service';


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ClubComponent implements OnInit {
  private clubForm: FormGroup;
  private clubName: FormControl;
  private clubAddress: FormControl;
	private sub: any;
	private clubDetails: any          = {};
  private editMode: boolean         = false;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private venueLabel: string        = 'Home Venue';
  private clubLabel: string         = 'Club Name';
  private addressLabel: string      = 'Club Address';
  private redirectOutlet: string    = '/clubs';
  private idClub: number;
  private homeVenue:any;
  private venues: [Object];
  private dataLoaded: boolean         = false;

  constructor( private apiService: ApiService,  
               private router: Router, 
               private route: ActivatedRoute,
               private fb: FormBuilder ){
  }

  ngOnInit() {
     this.createFormControls();
     this.createForm();
  }

  getClubDetails(){    
     /* See if we have a club ID. If so then club details are needed */
     this.sub = this.route.params.subscribe(params => {
       this.idClub = +params['id'];
       /*
        * Club is to be edited.
       */
       if(this.idClub){
         this.editMode = true;
         this.apiService.getData('/api/clubs/'+this.idClub).subscribe(data => {
            this.clubDetails = data[0];
            this.homeVenue = this.findVenue(this.clubDetails.Venue_idVenue);
         });
       }
       this.dataLoaded = true;
     });
  }

  findVenue = function(id: number){
    for(var i in this.venues){
      if(this.venues[i]['idVenue'] === id){
        return this.venues[i];
      }
    }
  }

  receiveVenuesList($event) {
    this.venues = $event;
    if(this.venues){
      this.getClubDetails();
    }
  }

  venueSelected(idVenue: number){
    this.homeVenue = this.venues.find(element=>{
      return element['idVenue'] === idVenue;
    });
  }

  submitForm(formDetails){
    
    let body = {    name: formDetails.clubName,
                    address: formDetails.clubAddress,
                    idVenue: this.homeVenue.idVenue};
    
    let url = '/api/clubs/add/';
    if(this.editMode)
      url = url + this.idClub;
                  
    this.apiService.postData(url, body).subscribe(data => {
        this.router.navigateByUrl(this.redirectOutlet);
    },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.router.navigateByUrl(this.redirectOutlet);
        }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createFormControls() {
    this.clubName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.clubAddress = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(120),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.homeVenue = new FormControl('',[

    ]);
  }

  createForm() {
    this.clubForm = this.fb.group({
      clubName:       this.clubName,
      clubAddress:    this.clubAddress,
      homeVenue:      this.homeVenue
    });       
  }

  @Output() clubDetailsMessage = new EventEmitter<Object>();

}
