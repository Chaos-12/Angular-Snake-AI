import { Injectable } from "@angular/core";
import { Directions, IaService, Network } from "../index";

@Injectable()
export class IaBuilder {

  constructor(){}

  public buildNetwork(foodTolerance:number, wallTolerance:number, bodyTolerance:number):Network{
    let newNetwork = new Network(12, 4);
    for(let i=0; i < Directions.length; i++){
      newNetwork.createConnection(IaService.indexFood+i, i, foodTolerance);
      newNetwork.createConnection(IaService.indexWall+i, i, wallTolerance);
      newNetwork.createConnection(IaService.indexBody+i, i, bodyTolerance);
    }
    return newNetwork;
  }
}
