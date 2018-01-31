import { Component, OnInit, ViewEncapsulation,
                 Input, Output, EventEmitter } from '@angular/core';
import { ApiService } 						   from '../api.service';
import { HttpErrorResponse } 				   from '@angular/common/http';

@Component({
  selector:        'app-rounds',
  templateUrl:     './rounds.component.html',
  styleUrls:       ['./rounds.component.css'],
  encapsulation:   ViewEncapsulation.None,
  providers:       [ApiService]
})

export class RoundsComponent implements OnInit {

	private title: string                 = "Rounds";
  	private addRoundLinkMessage: string   = "Add New Round" ;
	private rounds: any;

  constructor( private apiService: ApiService){
	
  }

  ngOnInit() {
  	 this.apiService.getData('/api/rounds').subscribe(data => {
  	 		this.rounds = data;
        this.sendRoundsList();
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
  @Input()  showRounds: boolean           = true;
  @Output() roundsList = new EventEmitter<Object>(); 

  sendRoundsList(){
    this.roundsList.emit(this.rounds);
  }

}