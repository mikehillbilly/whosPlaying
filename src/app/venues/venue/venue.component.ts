import { Component, OnInit, ViewEncapsulation, 
         Output, OnDestroy, EventEmitter }    from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, FormControl, Validators, 
                               FormBuilder}   from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { HttpErrorResponse }                  from '@angular/common/http';
import { ApiService }                         from '../../api.service';


@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class VenueComponent implements OnInit {
  private venueForm: FormGroup;
  private venueName: FormControl;
  private venueAddress: FormControl;
  private sub:         any;
  private venueDetails: any     = {};
  private idVenue: number;
  private editMode: boolean     = false;
  private dataLoaded: boolean   = false;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private venueLabel: string        = 'Venue Name';
  private addressLabel: string  = 'Venue Address';
  private redirectOutlet: string    = '/venues';

 constructor( private apiService: ApiService,  
               private router: Router, 
               private route: ActivatedRoute,
               private fb: FormBuilder ){
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getVenueDetails();
  }

  getVenueDetails(){
      this.sub = this.route.params.subscribe(params => {
        this.idVenue = +params['id'];
        if(this.idVenue){
          this.editMode = true;
          this.apiService.getData('/api/venues/'+this.idVenue).subscribe(data => {
            this.venueDetails = data[0];
            this.sendVenueDetails();
          });
        }
        this.dataLoaded = true;
      });  
  }

  sendVenueDetails(){
    this.venueDetailsMessage.emit(this.venueDetails);
  }

  submitForm(formDetails){
    
    let body = {    name: formDetails.venueName,
                    address: formDetails.venueAddress }
    
    let url = '/api/venues/add/';
    if(this.editMode)
      url = url + this.idVenue;
                  
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
    this.venueName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.venueAddress = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(120),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  createForm() {
    this.venueForm = this.fb.group({
      venueName:           this.venueName,
      venueAddress:    this.venueAddress,
    });       
  }

 @Output() venueDetailsMessage = new EventEmitter<Object>();
}
