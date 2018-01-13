import { NgModule, Component, Pipe, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, 
          AbstractControl, FormControl, Validators, 
          FormBuilder, FormArray }                      from '@angular/forms';
import { BrowserModule}                                 from '@angular/platform-browser';
import { platformBrowserDynamic}                        from '@angular/platform-browser-dynamic';
import { UmpireComponent}                               from '../../umpire/umpire.component';
import { ApiService}                                    from '../../api.service';
import { HttpErrorResponse }                            from '@angular/common/http';
import { RouterModule, Router }                         from '@angular/router';
import { AccreditationComponent}                        from '../../accreditation/accreditation.component';
import { ActivatedRoute }                               from '@angular/router';

@Component({
  selector: 'add-umpire',
  templateUrl: './add-umpire.component.html',
  styleUrls: ['./add-umpire.component.css'],
  providers: [ApiService]
  
})
export class AddUmpireComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  private addUmpireForm: FormGroup;
  private givenName: FormControl;
  private familyName: FormControl;
  private mobile: FormControl;
  private email: FormControl;
  private idUmpire: number;
  private fieldRequiredError: string            = "Entry is required";
  private invalidCharsError: string             = "Field contains invalid characters";
  private invalidPhoneNumberError: string       = "Invalid Phone Number";
  private submitWithoutAccreditationMsg: string = "Accreditation must be selected";
  private domain: string                        = 'sanfl.com.au' //to be derived from the client configuration
  private isDataAvailable: boolean              = false;
  private submitWithoutAccreditation            = false;
  private sub: any;
  private editMode: boolean                     = false;

  // Sharing data from two sub components
  @ViewChild(AccreditationComponent) accredComponent;
  @ViewChild(UmpireComponent) umpireComponent;

  constructor(  private route: ActivatedRoute,
                private apiService: ApiService,  
                private router: Router, 
                private fb: FormBuilder){

        this.createFormControls();
        this.createForm();
  }

  ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        /* If this component was called with a parameter then 
        the form needs to be pre-filled and set to edit mode */
        if(+params['id']){
          this.idUmpire = +params['id'];
          this.editMode = true;
          this.umpireComponent.getUmpireDetails(+params['id']);
        }
    });
  }

  /* The umpireComponent sends details of the Umpire */
  receiveUmpireDetails($event){
    this.givenName['text'] = $event.givenName;
    this.familyName['text'] = $event.familyName;
    this.email['text'] = $event.email;
    this.mobile['text'] = $event.mobile;
  }

  /* Called from HTML when the AccreditationModule is loaded*/
  accredLoaded(){
    this.accredComponent.allowSelect = true;
    this.isDataAvailable = true;
  }

  createFormControls() {
    this.givenName = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern("^([A-z]+[,.]?[ ]?|[A-z]+['-]?)+$")
      ]);

    this.familyName = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern("^([A-z]+[,.]?[ ]?|[A-z]+['-]?)+$")
      ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"),
      this.emailDomainValidator
    ]);
    this.mobile = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("[0-9]*"),
    ]);
  }

  createForm() {
    this.addUmpireForm = this.fb.group({
      name: new FormGroup({
        givenName: this.givenName,
        familyName: this.familyName,
      }),
      mobile: this.mobile,
      email:  this.email
    });       
  }

    emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email && email.indexOf("@") != -1) {
      let [_, domain] = email.split("@");
      if (domain !== 'sanfl.com.au') {
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null;
  }

  submitForm(value){
    let atLeastOne:boolean = false;
    let familyName = value['name']['familyName'];
    let givenName = value['name']['givenName'];
    let email = value['email'];
    let mobile = value['mobile'];
    let index:number = 0;
    let insertionClause:string = ''; 
    let query = "";

    let levels = <FormArray>this.accredComponent.accreditationForm.get('levels');
    levels.controls.forEach(entry=>{
        if(entry['checked']){
          let insertion = "('" + entry['idAccreditation'] + "',@idUmpire)"; 
          if(atLeastOne) {
            insertionClause += "," + insertion ;
          }else{
            insertionClause = insertion;
            atLeastOne = true;
            this.submitWithoutAccreditation = false;
          }
        }
    });

    if(atLeastOne){
      let insertQuery = "INSERT INTO Umpire (givenName, familyName, mobile, email, idEmployee) \
                  VALUES('"+ givenName +
                  "','" +familyName+
                  "','"+ mobile +
                   "','"+ email +
                   "',NULL); \
                  set @idUmpire = LAST_INSERT_ID();\
                  INSERT INTO AccreditedUmpire (Accreditation_idAccreditation, Umpire_idUmpire) \
                  VALUES "+insertionClause+";";  
      let updateQuery = "UPDATE `Umpire` SET `familyName`=\""+familyName+"\"" + 
                  ",`givenName`=\""+givenName+"\"" +
                  ",`mobile`=\""+mobile+"\"" + 
                  ",`email`=\""+email+"\"" + 
                  " WHERE `idUmpire`="+this.idUmpire+"; \
                  DELETE FROM AccreditedUmpire WHERE `Umpire_idUmpire`="+this.idUmpire+"; \
                  set @idUmpire = "+this.idUmpire+"; \
                  INSERT INTO AccreditedUmpire (Accreditation_idAccreditation, Umpire_idUmpire) \
                  VALUES "+insertionClause+";";  
      if(this.editMode === true){
        query = updateQuery;
      }else{
        query = insertQuery;
      }
      let body = {givenName: givenName, familyName: familyName, 
        email: email, mobile: mobile, query: query};
      try{
      this.apiService.postData('/api/data', body).subscribe(data => {
        this.router.navigateByUrl('/umpires');
       }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
       });
      }catch(err){}finally{}
    }else{
      this.submitWithoutAccreditation = true;
      console.log("At least one accreditation level must be selected")}
  }
}