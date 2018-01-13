import { Component, OnInit, ViewEncapsulation,
                                    ViewChild }   from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, FormControl, 
         Validators, FormBuilder, FormArray }     from '@angular/forms';
import { ApiService }                             from '../../api.service';
import { RouterModule, Router, ActivatedRoute }   from '@angular/router';
import { HttpErrorResponse }                      from '@angular/common/http';
import { VenueComponent }                         from '../venue/venue.component';

@Component({
  selector:      'app-add-venue',
  templateUrl:   './add-venue.component.html',
  styleUrls:     ['./add-venue.component.css'],
  encapsulation: ViewEncapsulation.None,  
  providers:     [ApiService]
})



export class AddVenueComponent implements OnInit {
  private addVenueForm: FormGroup;
  private venueName: FormControl;
  private venueAddress: FormControl;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private query: string          	= 'INSERT INTO Venue (name, address) VALUES';
  private sub: any;
  private idVenue: number;
  private editMode: boolean         = false;
  private venueNameLabel: string 	= "Venue Name";
  private venueAddressLabel: string 	= "Venue Address"

  @ViewChild(VenueComponent) venueComponent;

  constructor(  private apiService: ApiService,  
                private router: Router, 
                private route: ActivatedRoute,
                private fb: FormBuilder) { 
    this.createFormControls();
    this.createForm();
  }

    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        /* If this component was called with a parameter then 
        the form needs to be pre-filled and set to edit mode */
        if(+params['id']){
          this.idVenue = +params['id'];
          this.editMode = true;
          this.venueComponent.getVenueDetails(+params['id']);
        }
    });
  }

    /* The venueComponent sends details of the venue */
  receiveVenueDetails($event){
    this.venueName['text'] = $event.name;
    this.venueAddress['text'] = $event.address;
  }

  createForm() {
    this.addVenueForm = this.fb.group({
      venueName:       this.venueName,
      venueAddress:		this.venueAddress
    });       
  }

  createFormControls() {
    this.venueName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.venueAddress = new FormControl('', [
       Validators.required,
       Validators.minLength(10),
       Validators.maxLength(150),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  submitForm(formDetails){
  	console.log("FormDetails: ",formDetails);
    let values = " (\""+formDetails.venueName+"\", \""+formDetails.venueAddress+"\")";
    console.log(values);
    let query = this.query + values;
    let body = {	name: formDetails.venueName, 
    				address: formDetails.venueAddress, 
    				query: query};
    
    this.apiService.postData('/api/data', body).subscribe(data => {
    	console.log(data);
        this.router.navigateByUrl('/venues');
    },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.router.navigateByUrl('/venues');
        }
    });
  }

}


