import { Component, OnInit, ViewEncapsulation, 
         Output, OnDestroy, EventEmitter }    from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, FormControl, Validators, 
                               FormBuilder}   from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { HttpErrorResponse }                  from '@angular/common/http';
import { ApiService }                         from '../../api.service';


@Component({
  selector: 'app-accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccreditationComponent implements OnInit {
  private accreditationForm: FormGroup;
  private accreditationLevel: FormControl;
  private accreditationDescription: FormControl;
  private sub:         any;
  private accreditationDetails: any = {};
  private idAccreditation: number;
  private editMode: boolean         = false;
  private dataLoaded: boolean       = false;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private accreditationLabel: string= 'Accreditation Level';
  private descriptionLabel: string  = 'Accreditation Description';
  private redirectOutlet: string    = '/accreditations';

 constructor( private apiService: ApiService,  
               private router: Router, 
               private route: ActivatedRoute,
               private fb: FormBuilder ){
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getaccreditationDetails();
  }

  getaccreditationDetails(){
      this.sub = this.route.params.subscribe(params => {
        this.idAccreditation = +params['id'];
        if(this.idAccreditation){
          this.editMode = true;
          this.apiService.getData('/api/accreditations/'+this.idAccreditation).subscribe(data => {
            this.accreditationDetails = data[0];
            this.sendAccreditationDetails();
          });
        }
        this.dataLoaded = true;
      });  
  }

  sendAccreditationDetails(){
    this.accreditationDetailsMessage.emit(this.accreditationDetails);
  }

  submitForm(formDetails){  
    let body = {    level: formDetails.accreditationLevel,
                    description: formDetails.accreditationDescription }
    
    let url = '/api/accreditations/add/';
    if(this.editMode)
      url = url + this.idAccreditation;
                  
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

  createFormControls() {
    this.accreditationLevel = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.accreditationDescription = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(120),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  createForm() {
    this.accreditationForm = this.fb.group({
      accreditationLevel:           this.accreditationLevel,
      accreditationDescription:    this.accreditationDescription,
    });       
  }

  @Output() accreditationDetailsMessage = new EventEmitter<Object>();
}
