import { Component, OnInit } from "@angular/core";
import { PubSubService, Subject } from "src/main/services";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {

  private lastRenderTime = 0;
  public isOn = false;

  constructor(private pubSub:PubSubService){ }

  ngOnInit(): void {
  }

  public play():void{
    this.isOn = true;
    window.requestAnimationFrame(this.nextFrame.bind(this));
  }

  public pause():void{
    this.isOn = false;
  }

  public next():void{
    this.pubSub.post(Subject.animation, Subject.next);
  }

  public reset():void{
    this.pause();
    this.pubSub.post(Subject.animation, Subject.reset);
  }

  private nextFrame(currentTime:number):void{
    if(!this.isOn){
      return;
    }
    window.requestAnimationFrame(this.nextFrame.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if(secondsSinceLastRender < 0.2){
      return;
    }
    this.lastRenderTime = currentTime;
    this.next();
  }
}
