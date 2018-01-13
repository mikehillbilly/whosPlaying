import { Component, OnInit, ViewEncapsulation, 
		 Output, OnDestroy,EventEmitter } 		      from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';
import { ApiService }                           from '../../api.service';


@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class VenueComponent implements OnInit {
	private _venueName: string	     = null;
  private _venueAddress: string    = null;
	private sub:         any;
	private venueDetails;

  constructor(private route: ActivatedRoute, 
              private apiService: ApiService){
  }

  @Output() venueDetailsMessage = new EventEmitter<Object>();

  ngOnInit() {
   this.sub = this.route.params.subscribe(params => {
      this.getVenueDetails(+params['id']);
    });
  }

  getVenueDetails(id?: number){
    if(!id){
      console.log("No venue ID");
    }else{
      this.apiService.getData('/api/venues/add/'+id).subscribe(data => {
          this.venueDetails = data[0];
          this.sendVenueDetails();
      });
    }
  }

  sendVenueDetails(){
    this.venueDetailsMessage.emit(this.venueDetails);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAsObject(){
  	let venue = {
  			venueName: this._venueName,
        venueAddress: this._venueAddress
  		}
  	return venue;
  }

}
