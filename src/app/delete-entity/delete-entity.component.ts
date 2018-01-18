import { Component, OnInit, OnDestroy,
							ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, 
									 ParamMap } from '@angular/router';
import { HttpErrorResponse }                    from '@angular/common/http';
import { ApiService }                           from '../api.service';

@Component({
  selector:        'app-delete-entity',
  templateUrl:     './delete-entity.component.html',
  styleUrls:       ['./delete-entity.component.css'],
  encapsulation:   ViewEncapsulation.None,
  providers:       [ApiService]
})

export class DeleteEntityComponent implements OnInit {
	private paramsSub: any;
	private url: string;
	private redirect: string;

  constructor(	private apiService: ApiService,
  				      private router: Router,
  				      private route: ActivatedRoute ) { 
  }

  ngOnInit() {
  	this.paramsSub = this.route.params.subscribe(params => {
  		this.url = '/api/'+this.route.url['value'].join('/');
  		this.redirect = '/'+this.route.url['value'][0];
    	this.deleteEntity();
    });
  }
  
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  deleteEntity(){
    /*
      1. initForm()first so that we have a FormArray created
      2. For each returned row create a FormControl and add to the array
      3. If we have at least one control then isDataLoaded = true
    */
    let body = {};
    this.apiService.postData(this.url, body).subscribe(data => {
      
     }, (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      if(this.redirect)
      	this.router.navigateByUrl(this.redirect);
     });
  }
}
