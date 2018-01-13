import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ApiService}                            from '../../api.service';
import { HttpErrorResponse }                    from '@angular/common/http';

@Component({
  selector: 'app-delete-umpire',
  templateUrl: './delete-umpire.component.html',
  styleUrls: ['./delete-umpire.component.css'],
  providers: [ApiService],
  encapsulation: ViewEncapsulation.None
})

export class DeleteUmpireComponent implements OnInit {
	private query: string 		= 'DELETE FROM Umpire WHERE idUmpire = ';
	private sub: any;
	private umpireID: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService){  
  } 

  ngOnInit() {    
    this.sub = this.route.params.subscribe(params => {
      this.umpireID = +params['id'];
      if(this.umpireID)
        this.deleteUmpire();
    });
  }

  deleteUmpire(){
    /*
      1. initForm()first so that we have a FormArray created
      2. For each returned row create a FormControl and add to the array
      3. If we have at least one control then isDataLoaded = true
    */
    let body = {id: this.umpireID};
    this.apiService.postData('/api/umpire/delete', body).subscribe(data => {
      
     }, (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      this.router.navigateByUrl('/umpires');
     });
  }

}
