import { Injectable } from "@angular/core";
import { Network } from "src/logic";

@Injectable()
export class NetworkBuilder {

  public buildNetwork(inputTolerances:Array<number>, nOutputs:number):Network{
    let newNetwork = new Network(nOutputs*inputTolerances.length, nOutputs);
    for(let i=0; i < nOutputs; i++){
      for (let j=0; j < inputTolerances.length; j++){
        newNetwork.createConnection(j+i, i, inputTolerances[i]);
      }
    }
    return newNetwork;
  }
}
