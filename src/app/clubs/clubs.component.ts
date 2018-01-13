import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ApiService} from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})
export class ClubsComponent implements OnInit {

	private title: string = "Clubs";
  private addClubLinkMessage: string   = "Add New Club" ;
	private clubs;

  constructor( private apiService: ApiService){
	
  }

ngOnInit() {
  	 this.apiService.getData('/api/clubs').subscribe(data => {
  	 		this.clubs = data;
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

}
