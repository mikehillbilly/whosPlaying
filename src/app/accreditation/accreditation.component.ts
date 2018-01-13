import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService}                               from '../api.service';
import { HttpErrorResponse }                       from '@angular/common/http';
import { ActivatedRoute }                          from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, 
         AbstractControl, FormControl, Validators, 
         FormBuilder, FormArray }                  from '@angular/forms';

@Component({
  selector:     'app-accreditation',
  templateUrl:  './accreditation.component.html',
  styleUrls:    ['./accreditation.component.css'],
  providers:    [ApiService]
})

export class AccreditationComponent implements OnInit {
	private title: string         = "Accreditation";
  private allowSelect:boolean   = false;
  private isDataLoaded:boolean  = false;
  private accreditationForm: FormGroup;
  private sub: any;
  private accreditationDetails;
  private umpireAccreditation: any;
  private umpireID: number;

  @Output() dataLoadedEvent             = new EventEmitter<boolean>();
  @Output() accreditationDetailsMessage = new EventEmitter<Object>();

  constructor(  private apiService: ApiService,
                private route: ActivatedRoute,
                private fb: FormBuilder){
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.umpireID = +params['id'];
     // 1. Get all accreditation
     this.getAccreditation();

     // 2. check any levels for the id given

    });
  }

  checkAccredsForUmp(){
      this.apiService.getData('/api/accredUmpire/'+this.umpireID).subscribe(data => {
        this.umpireAccreditation = data;
        let levels = <FormArray>this.accreditationForm.get('levels');
        for(var key in levels.controls){
          this.umpireAccreditation.find(element=>{
            //console.log(element.Accreditation_idAccreditation);
            if(element.Accreditation_idAccreditation === levels.controls[key]['idAccreditation']){
              levels.controls[key]['checked'] = true;
              return;
            }
          });
        }
      });
  }

  getAccreditation(){
      /*
        1. initForm()first so that we have a FormArray created
        2. For each returned row create a FormControl and add to the array
        3. If we have at least one control then isDataLoaded = true
      */
      this.apiService.getData('/api/accreditation').subscribe(data => {
            this.initForm();
            let levels = <FormArray>this.accreditationForm.get('levels');
            for (var key in data){    
              let newLevel = new FormControl(false);
              newLevel['level'] = data[key].level;
              newLevel['idAccreditation'] = data[key].idAccreditation;
              newLevel['checked'] = false;
              levels.push(newLevel);
              if(levels.length > 0){
                this.isDataLoaded = true;
                this.dataLoadedEvent.emit(true);//Let Parent Component know
              }
            }
            if(this.umpireID)
               this.checkAccredsForUmp();
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
  }

    getAccreditationDetails(id?: number){
    if(!id){
      console.log("No Accreditation ID");
    }else{
      this.apiService.getData('/api/Accreditation/'+id).subscribe(data => {
          this.accreditationDetails = data[0];
          this.sendAccreditationDetails();
      });
    }
  }

    sendAccreditationDetails(){
    this.accreditationDetailsMessage.emit(this.accreditationDetails);
  }

  initForm(){
    this.accreditationForm = this.fb.group({
      levels: <FormArray>this.fb.array([]) 
    });
  }

}
