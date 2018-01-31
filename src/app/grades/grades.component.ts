import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService }                           from '../api.service';
import { HttpErrorResponse }                    from '@angular/common/http';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})
export class GradesComponent implements OnInit {

	private title: string = "Grades";
  private addGradeLinkMessage: string   = "Add New Grade" ;
	private grades: any; 

  constructor( private apiService: ApiService){
	
  }

ngOnInit() {
  	 this.apiService.getData('/api/grades').subscribe(data => {
  	 		this.grades = data;
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

