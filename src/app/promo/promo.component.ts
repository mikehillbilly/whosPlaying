import { Component, ViewEncapsulation, OnInit, ViewChild, AfterViewInit
								 }                    from '@angular/core';
import { ClubsComponent }							from '../clubs/clubs.component';
import { Observable }                 from 'rxjs';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PromoComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild('courasel') couraselElement;
  private element;
  private clubs;
  private logoAngles;
  private images;
  private xRadius:number;
  private yRadius:number;
  private cx:number;
  private cy:number;
  private viewPortWidth:number;
  private viewPortHeight:number;
  
  ngOnInit() {}

  ngAfterViewInit(){
  	this.element = this.couraselElement.nativeElement;
    this.scaleScene();
  }

  onResize($event){
    this.scaleScene($event.currentTarget.innerWidth,$event.currentTarget.innerHeight);
  }

  scaleScene(width?:number, height?:number){
    width?this.viewPortWidth=width:this.viewPortWidth = document.documentElement.clientWidth;
    height?this.viewPortHeight=height:this.viewPortHeight = document.documentElement.clientHeight;
    this.element.style.height = this.viewPortHeight * 0.8;
    this.element.style.width = this.viewPortWidth * 0.3
    this.xRadius = this.viewPortWidth / 3;
    this.yRadius = this.viewPortHeight * 0.1
    this.cx = this.viewPortWidth/4;
    this.cy = this.viewPortHeight/6;
  }

  receiveClubList($event){
  	this.clubs=$event;
  	/* This array holds the current angle for each of the logos */
  	this.images = new Array(this.clubs.length);
  	this.logoAngles = new Array(this.clubs.length);
  	this.scaledImages();
  }

  scaledImages(){
  	for(let i=0;i<this.clubs.length;i++){
  		this.images[i] = new Image();
  		this.images[i].src = this.clubs[i].logo;
  	}
  	this.initCourasel();
  }

  initCourasel(){
  	let delta = (Math.PI * 2)/this.clubs.length;
  	for(let i=0; i < this.clubs.length; i++){
  		this.logoAngles[i] = (delta*i);
  		if(this.logoAngles[i] > (2*Math.PI))
  			this.logoAngles[i]=0;	
  		let xpos = (Math.cos(this.logoAngles[i]) * this.xRadius) + this.cx;
  		let ypos = (Math.sin(this.logoAngles[i]) * this.yRadius) + this.cy;
  		let obj = this.returnObj(i,xpos, ypos, Math.round(ypos), this.clubs[i].logo);
  		this.element.innerHTML	 += obj;
  	}
  	let timer = Observable.timer(5,20);
  	timer.subscribe(val=>{
  		this.rotateCourasel();
  	});
  }

  returnObj(id, x, y, z, src){
  	return ('<div id="obj'+ id  +'" style="position: absolute; left:'+ x 
  			+'px; top:'+  y +'px; z-index:'+ z  +'; width:100px"><img id="img'+ id  
  			+'" src="../'+ src  +'" /></div>');
  }

  rotateCourasel(){
   	for (let i=0; i< this.clubs.length; i++ ){
  		this.logoAngles[i] += 0.008; //radians
  		if(this.logoAngles[i] > (2 * Math.PI))
  			this.logoAngles[i] = 0.0;
  		let xpos = (Math.cos(this.logoAngles[i]) * this.xRadius) + this.cx;
  		let ypos = (Math.sin(this.logoAngles[i]) * this.yRadius) + this.cy;
  		let obj = document.getElementById('obj'+i);
  		obj.style.left = xpos + 'px';
  		obj.style.top = ypos + 'px';
  		obj.style.zIndex = Math.round(ypos).toString();
  		//Scale the image
  		let objImg = document.getElementById('img'+i);
  		let delta = (ypos - this.cy + this.yRadius) / (2 * this.yRadius);
  		delta = 0.75*((delta + 1) / 2);
  		objImg.style.height = (delta * this.images[i].height) + 'px';
  		objImg.style.width = (delta * this.images[i].width) + 'px';
  	}
  }

}
