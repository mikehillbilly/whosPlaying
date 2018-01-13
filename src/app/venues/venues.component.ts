import { Component, OnInit, ViewEncapsulation,
                 Input, Output, EventEmitter } from '@angular/core';
import { ApiService } 							           from '../api.service';
import { HttpErrorResponse } 					         from '@angular/common/http';

@Component({
  selector:        'app-venues',
  templateUrl:     './venues.component.html',
  styleUrls:       ['./venues.component.css'],
  encapsulation:   ViewEncapsulation.None,
  providers:       [ApiService]
})

export class VenuesComponent implements OnInit {

	private title: string                 = "Game Venues";
  private addVenueLinkMessage: string   = "Add New Venue" ;
	private venues: any;

  constructor( private apiService: ApiService){
	
  }

  @Input() showVenues: boolean = true;
  @Output() venuesList = new EventEmitter<Object>(); 

  ngOnInit() {
  	 this.apiService.getData('/api/venues').subscribe(data => {
  	 		this.venues = data;
        this.sendVenueList();
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

  sendVenueList(){
    this.venuesList.emit(this.venues);
  }


}