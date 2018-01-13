import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService }                           from '../api.service';
import { HttpErrorResponse }                    from '@angular/common/http';
import { pushIfNotExist, inArray }              from '../utilities.js';


@Component({
  selector: 'app-umpires',
  templateUrl: './umpires.component.html',
  styleUrls: ['./umpires.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService]
})
export class UmpiresComponent implements OnInit {

	private title: string = "Umpires";
	private umpires: any[] = new Array();

  constructor( private apiService: ApiService){}
 
  ngOnInit() {
    this.apiService.getData('/api/umpires').subscribe(data => {
      for(var i in data){
        var element = { "id": data[i].id, 
                        "givenName": data[i].givenName, 
                        "familyName": data[i].familyName
                      };
        pushIfNotExist(this.umpires, element, function(e) {
          return e.givenName === element.givenName && e.familyName === element.familyName;
        });
      }
    });
  }
}



