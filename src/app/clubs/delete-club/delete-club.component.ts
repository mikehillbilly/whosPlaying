import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpErrorResponse }                    from '@angular/common/http';
import { ApiService }                           from '../../api.service';

@Component({
  selector:        'app-delete-club',
  templateUrl:     './delete-club.component.html',
  styleUrls:       ['./delete-club.component.css'],
  encapsulation:   ViewEncapsulation.None,
  providers:       [ApiService]
})

export class DeleteClubComponent implements OnInit {
	private idClub: number;
	private sub: any;

  constructor(	private apiService: ApiService,
  				      private router: Router,
  				      private route: ActivatedRoute ) { 
  }

  ngOnInit() {    
    this.sub = this.route.params.subscribe(params => {
      this.idClub = +params['id'];
      if(this.idClub)
        this.deleteClub();
    });
  }

  deleteClub(){
    /*
      1. initForm()first so that we have a FormArray created
      2. For each returned row create a FormControl and add to the array
      3. If we have at least one control then isDataLoaded = true
    */
    let body = {id: this.idClub};
    this.apiService.postData('/api/club/delete', body).subscribe(data => {
      
     }, (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      this.router.navigateByUrl('/clubs');
     });
  }
}
