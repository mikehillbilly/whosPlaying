import { Component, OnInit, OnDestroy, 
                Output, EventEmitter }          from '@angular/core';
import { validateEmail, validateMobile }        from '../utilities.js';
import { ActivatedRoute }                       from '@angular/router';
import { ApiService }                           from '../api.service';
import { ReactiveFormsModule, FormsModule, 
         FormGroup, AbstractControl, 
         FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-umpire',
  providers: [ApiService],
  templateUrl: './umpire.component.html',
  styleUrls: ['./umpire.component.css']
})

export class UmpireComponent implements OnInit {
	private _givenName:  string	= null;
	private _familyName: string = null;
	private _mobile:     string = null;
	private _email:      string = null;
  private sub:         any;
  private editUmpireForm: FormGroup;
  private umpireDetails;

  constructor(private route: ActivatedRoute, 
              private apiService: ApiService){
  }

  @Output() umpireDetailsMessage = new EventEmitter<Object>();

  ngOnInit() {
   this.sub = this.route.params.subscribe(params => {
      this.getUmpireDetails(+params['id']);
    });
  }

  getUmpireDetails(id?: number){
    if(!id){
      console.log("No Umpire ID");
    }else{
      this.apiService.getData('/api/umpires/add/'+id).subscribe(data => {
          this.umpireDetails = data[0];
          this.sendUmpireDetails();
      });
    }
  }

  sendUmpireDetails(){
    this.umpireDetailsMessage.emit(this.umpireDetails);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  set givenName(name: string){
  	try{
  		if (name.length > 2 && name.length < 51){
  			this.givenName = name;
  		}
  	}catch(err){
  		console.log(err);
  	}
  }

    set familyName(name: string){
  	try{
  		if (name.length > 2 && name.length < 51){
  			this.givenName = name;
  		}
  	}catch(err){
  		console.log(err);
  	}
  }
  set email(email: string){
  	try{
  		if(validateEmail(email)){
  			this._email = email;
  		}else throw 'Invalid email';
  	}catch(err){
  		console.log(err);
  	}
  }

  set mobile(number: string){
  	try{
  		if(validateMobile(number)){
  			this._mobile = number;
  		}else throw 'Invalid mobile';
  	}catch(err){
  		console.log(err);
  	}
  }

  getAsObject(){

  	let umpire = {

  			name: {
  				givenName: this._givenName,
  				familyName: this._familyName
  			},
  			mobile: this._mobile,
  			email: this._email
  		}
  	return umpire;
  }
}
