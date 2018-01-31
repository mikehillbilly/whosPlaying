import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModule }                                   from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute }        from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {
	private _modules: any;

	@Input() modules: any

  constructor(private router: Router) {

   }

  ngOnInit() {
  }

tabChange($event){
  this.router.navigateByUrl($event.nextId);

}
}
