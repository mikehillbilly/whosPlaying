import { Component, OnInit, ViewEncapsulation, 
         Output, OnDestroy, EventEmitter }    from '@angular/core';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, FormControl, Validators, 
                               FormBuilder}   from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { HttpErrorResponse }                  from '@angular/common/http';
import { ApiService }                         from '../../api.service';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GradeComponent implements OnInit {
  private gradeForm: FormGroup;
  private gradeName: FormControl;
  private gradeDescription: FormControl;
	private sub:         any;
	private gradeDetails: any     = {};
  private idGrade: number;
  private editMode: boolean     = false;
  private dataLoaded: boolean   = false;
  private invalidCharsError:string  = 'Invalid characters';
  private fieldRequiredError:string = 'Entry Required';
  private gradeLabel: string        = 'Grade Name';
  private descriptionLabel: string  = 'Grade Description';
  private redirectOutlet: string    = '/grades';

 constructor( private apiService: ApiService,  
               private router: Router, 
               private route: ActivatedRoute,
               private fb: FormBuilder ){
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getGradeDetails();
  }

  getGradeDetails(id?: number){
      this.sub = this.route.params.subscribe(params => {
        this.idGrade = +params['id'];
        if(this.idGrade){
          this.editMode = true;
          this.apiService.getData('/api/grades/'+this.idGrade).subscribe(data => {
            this.gradeDetails = data[0];
            this.sendGradeDetails();
          });
        }
        this.dataLoaded = true;
      });  
  }

  sendGradeDetails(){
    this.gradeDetailsMessage.emit(this.gradeDetails);
  }

  submitForm(formDetails){
    
    let body = {    name: formDetails.gradeName,
                    description: formDetails.gradeDescription }
    
    let url = '/api/grades/add/';
    if(this.editMode)
      url = url + this.idGrade;
                  
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
    this.gradeName = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
    this.gradeDescription = new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(120),
       Validators.pattern("^([A-z]+[ ]*[0-9]*)+$")
    ]);
  }

  createForm() {
    this.gradeForm = this.fb.group({
      gradeName:           this.gradeName,
      gradeDescription:    this.gradeDescription,
    });       
  }

  @Output() gradeDetailsMessage = new EventEmitter<Object>();
}
