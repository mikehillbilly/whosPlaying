import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {
	private port: number  		= 3000;
	private protocol: string  = 'http';
	private host: string  		= 'localhost';

	constructor(private http: HttpClient) { }
 
  getData(url:string){
  	return this.http.get(this.protocol +'://'+ this.host + ':' + this.port + url);
  }

  postData(url:string, body){
  	return this.http.post(this.protocol +'://'+ this.host + ':' + this.port + url, body);
  }
}

/*
Tasks
1. Store API in the database and remove hard code and replace with lookup from DB ("http://localhost:3000")
*/
