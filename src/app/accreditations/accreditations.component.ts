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
  private sub: any;
  private _idUmpire: number;
  private isDataLoaded: boolean                 = false;

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
    this._idUmpire = id;
    if(this.idUmpire)
      this.getUmpireAccreditations();
  }

 @Input()   showAccreditations: boolean  = true;
 @Input()   showCheckBox: boolean        = false;
 @Output()  accreditationsList           = new EventEmitter<Object>();

  ngOnInit() {
    this.getAllAccreditations();   
  }

  getAllAccreditations(){
     this.apiService.getData('/api/accreditations').subscribe(data => {
         this.accreditations = data;
         this.sendAccreditationsList();  
         this.isDataLoaded = true;  
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
    this.apiService.getData('/api/accreditations/umpire/'+this.idUmpire).subscribe(data=>{
      if(data){
        for(var i in data){
          let accred = this.accreditations.find(element=>{
            return (element.idAccreditation === data[i].Accreditation_idAccreditation);
          });
          accred['checked'] = true;
        }
         this.sendAccreditationsList(); 
      }
    });
  }

  sendAccreditationsList(){
    this.accreditationsList.emit(this.accreditations);
  }
}

