import {
  Component,
  Input,
  Output,
  SimpleChange,
  OnChanges, 
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { ClubsComponent }						from '../clubs/clubs.component';
import { DragulaService } 						from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css', '../../../node_modules/dragula/dist/dragula.css'],
  encapsulation: ViewEncapsulation.None
})
export class FixturesComponent implements OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(private dragulaService: DragulaService) { 
		dragulaService.setOptions('club-bag', {
      		revertOnSpill: true
    });
  }





  private screenWidth;
  private clubs;
  private slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

ngAfterContentInit(){}
ngAfterContentChecked(){}
ngAfterViewInit(){}
ngDoCheck(){}
ngOnChanges(){}
ngAfterViewChecked(){
/*	if(this.clubs){
		let div = document.getElementById(this.clubs[0].idClub);
		div.classList.add('active');
	}
*/
}
ngOnDestroy(){}


afterChange(e){
	console.log(e);
}


getScreenWidth(){
	this.screenWidth = document.documentElement.clientWidth;
}

receiveClubList($event){
	this.clubs = $event;

}

}
