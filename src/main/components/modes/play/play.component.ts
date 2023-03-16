import { Component, OnDestroy, OnInit } from '@angular/core';
import { Direction, Player, Subject } from 'src/main/data';
import { PlayerLogic, PubSubService, Subscriber } from 'src/main/services';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy, Subscriber {

  public readonly directions = Direction;

  public player:Player;

  public userKeys:Map<string,Direction>;

  private unsubscribe!:CallableFunction;

  constructor(private playerLogic:PlayerLogic, private pubSub:PubSubService) {
    this.player = this.playerLogic.buildPlayer('Player 1');

    this.userKeys = new Map();
    this.userKeys.set('ArrowUp', Direction.north);
    this.userKeys.set('ArrowDown', Direction.south);
    this.userKeys.set('ArrowLeft', Direction.west);
    this.userKeys.set('ArrowRight', Direction.east);
  }

  ngOnInit(): void {
      this.unsubscribe = this.pubSub.subscribe(this, Subject.animation);
  }

  ngOnDestroy(): void {
      this.unsubscribe();
  }

  public notify(message:Subject):void{
    switch(message){
      case Subject.next:
        this.playerLogic.nextMove(this.player);
        break;
      case Subject.reset:
        this.playerLogic.reset(this.player);
        break;
    }
  }

  public reset():void{
    this.playerLogic.reset(this.player);
  }
}

