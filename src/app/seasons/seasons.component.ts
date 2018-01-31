import { Component, OnInit, ViewEncapsulation,
                 Input, Output, EventEmitter } from '@angular/core';
import { ApiService } 						   from '../api.service';
import { HttpErrorResponse } 				   from '@angular/common/http';

@Component({
  selector:        'app-seasons',
  templateUrl:     './seasons.component.html',
  styleUrls:       ['./seasons.component.css'],
  encapsulation:   ViewEncapsulation.None,
  providers:       [ApiService]
})

export class SeasonsComponent implements OnInit {

	private title: string                  = "Seasons";
  	private addSeasonLinkMessage: string   = "Add New Season" ;
	private seasons: any;

  constructor( private apiService: ApiService){
	
  }

  ngOnInit() {
  	 this.apiService.getData('/api/seasons').subscribe(data => {
  	 		this.seasons = data;
  	 		console.log(this.seasons);
        this.sendSeasonList();
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

  @Input()  showSeasons: boolean           = true;
  @Output() seasonsList = new EventEmitter<Object>(); 

  sendSeasonList(){
    this.seasonsList.emit(this.seasons);
  }

}
