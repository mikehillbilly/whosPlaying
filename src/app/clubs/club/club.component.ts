import { Component, OnInit, ViewEncapsulation, 
		       Output, OnDestroy,EventEmitter } 		from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';
import { ApiService }                           from '../../api.service';


@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ClubComponent implements OnInit {
	private _clubName:  string	= null;
	private sub:         any;
	private clubDetails;

  constructor(private route: ActivatedRoute, 
              private apiService: ApiService){
  }

  @Output() clubDetailsMessage = new EventEmitter<Object>();

  ngOnInit() {
   this.sub = this.route.params.subscribe(params => {
      this.getClubDetails(+params['id']);
    });
  }

  getClubDetails(id?: number){
    if(!id){
      console.log("No club ID");
    }else{
      this.apiService.getData('/api/clubs/add/'+id).subscribe(data => {
          this.clubDetails = data[0];
          this.sendClubDetails();
      });
    }
  }

  sendClubDetails(){
    this.clubDetailsMessage.emit(this.clubDetails);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
