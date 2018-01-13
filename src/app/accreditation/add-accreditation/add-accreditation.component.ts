import { Component, OnInit, ViewEncapsulation,
                                    ViewChild }   from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, FormControl, 
         Validators, FormBuilder, FormArray }     from '@angular/forms';
import { ApiService}                              from '../../api.service';
import { RouterModule, Router, ActivatedRoute }   from '@angular/router';
import { HttpErrorResponse }                      from '@angular/common/http';
import { AccreditationComponent }                 from '../accreditation.component';

@Component({
  selector:      'app-add-accreditation',
  templateUrl:   './add-accreditation.component.html',
  styleUrls:     ['./add-accreditation.component.css'],
  encapsulation: ViewEncapsulation.None,  
  providers:     [ApiService]
})

export class AddAccreditationComponent implements OnInit {
	private addAccreditationForm: FormGroup;
  private level:                FormControl;
  private description:          FormControl;
  private idAccreditation: number;
  private editMode: boolean         = false;
  private sub: any;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  
    @ViewChild(AccreditationComponent) accreditationComponent;

  constructor(  private apiService: ApiService,  
                private router: Router,
                private route: ActivatedRoute, 
                private fb: FormBuilder) { 
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
        /* If this component was called with a parameter then 
        the form needs to be pre-filled and set to edit mode */
        if(+params['id']){
          this.idAccreditation = +params['id'];
          this.editMode = true;
          this.accreditationComponent.getGradeDetails(+params['id']);
        }
    });
  }

  createForm() {
    this.addAccreditationForm = this.fb.group({
      level:       this.level,
      description: this.description
    });       
  }

  createFormControls() {
    this.level = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.description = new FormControl('', [
       Validators.minLength(3),
       Validators.maxLength(100),
       Validators.pattern("^([A-z]*[., ]*[0-9]*)+$")
    ]);
  }

  submitForm(formDetails){
    let url = '/api/accreditation/add/';
    if(this.editMode)
      url = url + this.idAccreditation;
    let body = {level: formDetails.level, description: formDetails.description}; 
    this.apiService.postData('/api/accreditation/add', body).subscribe(data => {
        this.router.navigateByUrl('/accreditation');
    },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.router.navigateByUrl('/accreditation');
        }
    });
    
  }

}
