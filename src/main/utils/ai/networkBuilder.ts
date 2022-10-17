import { Injectable } from "@angular/core";
import { Tolerances } from "src/main/dto";
import { Directions } from "src/main/enum";
import { Network } from "src/main/logic";

@Injectable()
export class NetworkBuilder {

  public buildNetwork(tolerances:Tolerances):Network{
    let newNetwork = new Network();
    for(let dir of Directions){
      newNetwork.createConnection(newNetwork.foodNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.food/100);
      newNetwork.createConnection(newNetwork.bodyNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.body/100);
      newNetwork.createConnection(newNetwork.wallNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.wall/100);
      newNetwork.createConnection(newNetwork.rockNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.rock/100);
    }
    return newNetwork;
  }
}
