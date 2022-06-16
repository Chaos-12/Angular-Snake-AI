import { Component, Input, OnInit } from "@angular/core";
import { Ai, InputProvider } from 'src/main/logic';
import { PubSubService, Subject, Subscriber } from "src/main/utils";

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css']
})
export class AiComponent implements OnInit, Subscriber{

  @Input()
  public aiList!:Array<Ai>;

  constructor(private pubSub:PubSubService, private inputProvider:InputProvider){ }

  ngOnInit():void{
    this.pubSub.subscribe(this, Subject.animation);
  }

  public notify(subject:Subject){
    switch(subject){
      case Subject.next:
        for(let ai of this.aiList){
          ai.makeSnakeDecide(this.inputProvider);
          ai.checkForReset();
        }
        break;
      case Subject.reset:
        for(let ai of this.aiList){
          ai.reset();
        }
        break;
    }
  }

}
