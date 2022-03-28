import { Injectable } from "@angular/core";
import { Network } from "src/logic";

@Injectable()
export class NetworkBuilder {

  public buildNetwork(inputTolerances:Array<number>, nOutputs:number):Network{
    let nInputs = nOutputs*inputTolerances.length;
    let newNetwork = new Network(nInputs, nOutputs);
    for(let i=0; i < nOutputs; i++){
      for (let j=0; j < inputTolerances.length; j++){
        newNetwork.createConnection(1+i+j*nOutputs, 1+nInputs+i, inputTolerances[j]);
      }
    }
    return newNetwork;
  }
}
