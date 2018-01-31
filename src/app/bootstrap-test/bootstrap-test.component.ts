import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModule } 							from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bootstrap-test',
  templateUrl: './bootstrap-test.component.html',
  styleUrls: ['./bootstrap-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BootstrapTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
