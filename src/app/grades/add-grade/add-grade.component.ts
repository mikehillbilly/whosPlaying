import { Component, OnInit, ViewEncapsulation,
                                    ViewChild }   from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, FormControl, 
         Validators, FormBuilder, FormArray }     from '@angular/forms';
import { ApiService }                             from '../../api.service';
import { RouterModule, Router, ActivatedRoute }   from '@angular/router';
import { HttpErrorResponse }                      from '@angular/common/http';
import { GradeComponent }                          from '../grade/grade.component';

@Component({
  selector:      'app-add-grade',
  templateUrl:   './add-grade.component.html',
  styleUrls:     ['./add-grade.component.css'],
  encapsulation: ViewEncapsulation.None,  
  providers:     [ApiService]
})



export class AddGradeComponent implements OnInit {
  private addGradeForm: FormGroup;
  private gradeName: FormControl;
  private gradeDescription: FormControl;
  private gradeNameLabel: string 	= "Grade Name"
  private gradeDescLabel: string 	= "Grade Description";
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private sub: any;
  private idGrade: number;
  private editMode: boolean         = false;

  @ViewChild(GradeComponent) gradeComponent;

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
          this.idGrade = +params['id'];
          this.editMode = true;
          this.gradeComponent.getGradeDetails(+params['id']);
        }
    });
  }

    /* The gradeComponent sends details of the grade */
  receiveGradeDetails($event){
    this.gradeName['text'] = $event.name;
    this.gradeDescription['text'] = $event.description;
  }

  createForm() {
    this.addGradeForm = this.fb.group({
      gradeName:       	this.gradeName,
      gradeDescription:	this.gradeDescription
    });       
  }

  createFormControls() {
    this.gradeName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);

    this.gradeDescription = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(100),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  submitForm(formDetails){
    let body = {name: formDetails.gradeName, description: formDetails.gradeDescription};
    let url = '/api/grades/add/';
    if(this.editMode)
    	url = url + this.idGrade;
    this.apiService.postData(url, body).subscribe(data => {
        this.router.navigateByUrl('/grades');
    },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          this.router.navigateByUrl('/grades');
        }
    });
  }

}

