import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:       [ApiService]
})
export class AppComponent {
	private title: string 	= "SANFL Fixture Management Application";
	private logo: string 	= "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/SANFL_logo.svg/1200px-SANFL_logo.svg.png";
  private modules: any;

  constructor( private apiService: ApiService ){

  }

  ngOnInit(){
  	//Get the title from the database depending on the customer
  	//Get the logo string from the database for this customer.
    //Get the enabled Modules
    this.loadEnabledModules();
  }

  loadEnabledModules(){
      this.apiService.getData('/api/modules').subscribe(data => {
        this.modules = data;
      });
  }
}
