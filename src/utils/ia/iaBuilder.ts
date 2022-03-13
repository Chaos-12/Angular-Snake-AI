import { Injectable } from "@angular/core";
import { Network, Directions } from "src/logic";
import { InputProvider } from "../index";

@Injectable()
export class IaBuilder {

  constructor(){}

  public buildNetwork(foodTolerance:number, wallTolerance:number, bodyTolerance:number):Network{
    let newNetwork = new Network(12, 4);
    for(let i=0; i < Directions.length; i++){
      newNetwork.createConnection(InputProvider.indexFood+i, i, foodTolerance);
      newNetwork.createConnection(InputProvider.indexWall+i, i, wallTolerance);
      newNetwork.createConnection(InputProvider.indexBody+i, i, bodyTolerance);
    }
    return newNetwork;
  }
}
