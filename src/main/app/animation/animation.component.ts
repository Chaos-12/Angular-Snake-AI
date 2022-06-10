import { Component, OnInit } from "@angular/core";
import { PubSubService, Subject } from "src/main/utils";


@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class BoardComponent implements OnInit {

  public isPaused = true;

  constructor(private pubSub:PubSubService){ }

  ngOnInit(): void {
  }

  public pressPlay():void{
    this.pubSub.post(Subject.animation, Subject.play);
  }

  public pressPause():void{
    this.pubSub.post(Subject.animation, Subject.pause);
  }

  public pressNext():void{
    this.pubSub.post(Subject.animation, Subject.next);
  }

  public pressReset():void{
    this.pubSub.post(Subject.animation, Subject.reset);
  }
}
