import { Component, Input, OnInit } from "@angular/core";
import { Tolerances } from "src/main/dto";
import { Ai } from 'src/main/logic';
import { InputProvider, PubSubService, Subject, Subscriber } from "src/main/utils";

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent implements OnInit, Subscriber{

  @Input()
  public ai!:Ai;

  @Input()
  public tolerances!:Tolerances;

  constructor(private pubSub:PubSubService, private inputProvider:InputProvider){ }

  ngOnInit():void{
    this.pubSub.subscribe(this, Subject.animation);
  }

  public notify(subject:Subject){
    switch(subject){
      case Subject.next:
        this.ai.makeSnakeDecide(this.inputProvider);
        this.ai.checkForReset();
        break;
      case Subject.reset:
        this.ai.reset();
        break;
    }
  }

}