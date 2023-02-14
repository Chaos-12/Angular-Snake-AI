import { Component, OnDestroy, OnInit } from '@angular/core';
import { Robot, Tolerances } from "src/main/entity";
import { NetworkBuilder, PubSubService, Subject, Subscriber } from 'src/main/utils';
import { IdService } from 'src/main/utils/idService';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy, Subscriber {

  public aiList:Array<Robot> = [];
  public tolList:Array<Tolerances> = [];

  public tolerances:Tolerances = new Tolerances(0, 0, 0, 0);

  constructor(
    private networkBuilder:NetworkBuilder,
    private pubSub:PubSubService,
    private idService:IdService) { }

  ngOnInit(): void {
    this.pubSub.subscribe(this, Subject.deleteSnake);
    this.createIa(new Tolerances(100, -100, -100, -100));
    this.createIa(new Tolerances(40, -100, -20, -100));
    this.createIa(new Tolerances(30, -100, -10, -80));
    this.createIa(new Tolerances(25, -100, -25, -30));
  }

  ngOnDestroy(): void {
    this.aiList = [];
  }

  notify(message:string):void{
    this.deleteRobot(message);
  }

  public createIa(tolerances:Tolerances):void{
    let network = this.networkBuilder.buildNetwork(tolerances);
    this.aiList.push(new Robot(this.idService.generateId(), network));
    this.tolList.push(tolerances);
  }

  private deleteRobot(idRobot:string): void{
    for (let i = 0; i<this.aiList.length; i++){
      if (this.aiList[i].id == idRobot){
        this.aiList.splice(i, 1);
        this.tolList.splice(i, 1);
        return;
      }
    }
  }
}
