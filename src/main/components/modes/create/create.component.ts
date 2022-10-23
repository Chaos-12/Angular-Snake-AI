import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tolerances } from "src/main/dto";
import { Ai } from 'src/main/logic';
import { NetworkBuilder } from 'src/main/utils';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public aiList:Array<Ai> = [];
  public tolList:Array<Tolerances> = [];

  public tolerances:Tolerances = new Tolerances(0, 0, 0, 0);

  constructor(private networkBuilder:NetworkBuilder) { }

  ngOnInit(): void {
    this.createIa(new Tolerances(100, -100, -100, -100));
    this.createIa(new Tolerances(40, -100, -20, -100));
    this.createIa(new Tolerances(30, -100, -10, -80));
    this.createIa(new Tolerances(25, -100, -25, -30));
  }

  ngOnDestroy(): void {
    this.aiList = [];
  }

  public createIa(tolerances:Tolerances):void{
    let network = this.networkBuilder.buildNetwork(tolerances);
    this.aiList.push(new Ai(network));
    this.tolList.push(tolerances);
  }

  public deleteIa(index:number):void{
    this.aiList.splice(index, 1);
    this.tolList.splice(index, 1);
  }

}
