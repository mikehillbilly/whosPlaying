import { Component, OnInit, ViewEncapsulation,
                  OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ApiService }                           from '../api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse }                    from '@angular/common/http';

@Component({
  selector: 'app-accreditations',
  templateUrl: './accreditations.component.html',
  styleUrls: ['./accreditations.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})

export class AccreditationsComponent implements OnInit {

  private title: string                         = "Umpire Accreditations";
  private addAccreditationLinkMessage: string   = "Add New Accreditation" ;
  private accreditations; 
  private umpireAccreditations;
  private sub: any;
  private _idUmpire: number;

  constructor( private apiService: ApiService,
                private route: ActivatedRoute,
                private router: Router){
  
  }

  get idUmpire(): number {
    // transform value for display
    return this._idUmpire;
  }
  
  @Input()
  set idUmpire(id: number) {
    console.log('prev value: ', this._idUmpire);
    console.log('got ID: ', id);
    this._idUmpire = id;
    this.getUmpireAccreditations();
  }

 @Input()   showAccreditations: boolean  = false;
 @Output()  accreditationsList           = new EventEmitter<Object>();
 @Output()  accredUmpList                = new EventEmitter<Object>();

  ngOnInit() {
    this.getAllAccreditations();
      
  }

  getAllAccreditations(){
     this.apiService.getData('/api/accreditations').subscribe(data => {
         this.accreditations = data;
         this.sendAccreditationsList();
         
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

  getUmpireAccreditations(){
    console.log("idUmpire: ", this.idUmpire)
    this.apiService.getData('/api/accreditations/umpire/'+this.idUmpire).subscribe(data=>{
      this.umpireAccreditations = data;
      console.log("Umpire Accreditations: ",this.umpireAccreditations);
    });
  }

  sendAccreditationsList(){
    this.accreditationsList.emit(this.accreditations);
  }

  sendAccredUmpList(){
    console.log("Sending: ", this.accredUmpList)
    this.accreditationsList.emit(this.accredUmpList);
  }
}

