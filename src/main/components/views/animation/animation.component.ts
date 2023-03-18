import { Component, OnDestroy } from "@angular/core";
import { Subject } from "src/main/data";
import { PubSubService } from "src/main/services";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnDestroy{

  private lastRenderTime = 0;
  public isOn = false;

  constructor(private pubSub:PubSubService){ }

  public play():void{
    this.isOn = true;
    window.requestAnimationFrame(this.nextFrame.bind(this));
  }

  public pause():void{
    this.isOn = false;
  }

  public next():void{
    this.pubSub.post(Subject.animation);
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

  ngOnDestroy(): void {
      this.pause();
  }
}
