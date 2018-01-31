import { NgModule, Component, Pipe, OnInit }            from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, 
          AbstractControl, FormControl, Validators, 
          FormBuilder, FormArray }                      from '@angular/forms';
import { BrowserModule}                                 from '@angular/platform-browser';
import { platformBrowserDynamic}                        from '@angular/platform-browser-dynamic';
import { ApiService}                                    from '../../api.service';
import { HttpErrorResponse }                            from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute }         from '@angular/router';
import { AccreditationComponent}                        from '../../accreditations/accreditation/accreditation.component';

@Component({
  selector: 'app-umpire',
  templateUrl: './umpire.component.html',
  styleUrls: ['./umpire.component.css'],
  providers: [ApiService]
  
})
export class UmpireComponent implements OnInit {
  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  private umpireForm: FormGroup;
  private givenName: FormControl;
  private familyName: FormControl;
  private mobile: FormControl;
  private email: FormControl;
  private accreds: FormControl;
  private idUmpire: number;
  private fieldRequiredError: string            = "Entry is required";
  private invalidCharsError: string             = "Field contains invalid characters";
  private invalidPhoneNumberError: string       = "Invalid Phone Number";
  private submitWithoutAccreditationMsg: string = "Accreditation must be selected";
  private domain: string                        = 'sanfl.com.au' //to be derived from the client configuration
  private sub: any;
  private editMode: boolean                     = false;
  private accreditations: [Object];
  private umpireAccreditations: [Object];
  private dataLoaded: boolean                   = false;
  private umpireDetails: any                    = {};
  private redirectURL: string                   = '/umpires';

  constructor(  private route: ActivatedRoute,
                private apiService: ApiService,  
                private router: Router, 
                private fb: FormBuilder){
  }

  ngOnInit(){
     this.createFormControls();
     this.createForm();
   }

   /*
   * Sent from the accreditations.component.
   * Won't retrieve umpire details until list is received.
   * Note we call 'dataLoaded' after both Accreditations and 
   * Umpire Details are loaded.
   */
  receiveAccreditationsList($event) {
    this.accreditations = $event;
    if(this.accreditations){
      this.getUmpireDetails();
    }
  }

  getUmpireDetails(){    
     /* See if we have a club ID. If so then club details are needed */
     this.sub = this.route.params.subscribe(params => {
       if(+params['id']){
         this.idUmpire = +params['id'];
         this.editMode = true;
         this.apiService.getData('/api/umpires/'+this.idUmpire).subscribe(data => {
            this.umpireDetails = data[0];
         });
       }
       this.dataLoaded = true;
     });
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
    this.accreds = new FormControl('');
  }

  createForm() {
    this.umpireForm = this.fb.group({
      name: new FormGroup({
        givenName: this.givenName,
        familyName: this.familyName,
      }),
      mobile: this.mobile,
      email:  this.email,
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

  accredsValidator(){
    let checked = this.accreditations.find(element=>{
      return (element['checked'] === true);
    });
    if(!checked)
      return false; 
    return true;
  }

  getAccreditationClause(): string{
    let atLeastOne:boolean = false;
    let accreditationClause:string;

    this.accreditations.forEach(entry=>{
      if(entry['checked']){
        let insertion = "(" + entry['idAccreditation'] + ",@idUmpire)"; 
        if(atLeastOne) {
          accreditationClause += "," + insertion;
        }else{
          accreditationClause = insertion;
          atLeastOne = true;
        }
      }
    });
    return accreditationClause;
  }

  submitForm(formDetails){
    let accreditationClause = '()';
    if(this.accredsValidator()){
      accreditationClause = this.getAccreditationClause();

      let body = { givenName: formDetails.name.givenName,
                   familyName: formDetails.name.familyName,
                   mobile: formDetails.mobile,
                   email: formDetails.email,
                   accreditationClause: accreditationClause
                 };
    
      let url = '/api/umpires/add/';
      if(this.editMode)
        url = url + this.idUmpire;

      this.apiService.postData(url, body).subscribe(data => {
        this.router.navigateByUrl(this.redirectURL);
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
    }else{
      console.log("At least one accreditation level must be selected");
    }
  }

}

/*

 


*/
    /*
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
  */