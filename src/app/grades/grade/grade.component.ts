import { Component, OnInit, ViewEncapsulation, 
		 Output, OnDestroy,EventEmitter } 		from '@angular/core';
import { ActivatedRoute }                       from '@angular/router';
import { ApiService }                           from '../../api.service';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GradeComponent implements OnInit {
	private _gradeName: string	     	= null;
  	private _gradeDescription: string   = null;
	private sub:         any;
	private gradeDetails;

  constructor(private route: ActivatedRoute, 
              private apiService: ApiService){
  }

  @Output() gradeDetailsMessage = new EventEmitter<Object>();

  ngOnInit() {
   this.sub = this.route.params.subscribe(params => {
      this.getGradeDetails(+params['id']);
    });
  }

  getGradeDetails(id?: number){
    if(!id){
      console.log("No grade ID");
    }else{
      this.apiService.getData('/api/grades/add/'+id).subscribe(data => {
          this.gradeDetails = data[0];
          this.sendGradeDetails();
      });
    }
  }

  sendGradeDetails(){
    this.gradeDetailsMessage.emit(this.gradeDetails);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
