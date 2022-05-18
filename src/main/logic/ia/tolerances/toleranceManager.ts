import { Injectable } from "@angular/core";
import { Network, Tolerances, Directions } from "src/main/logic";

@Injectable()
export class ToleranceManager {

  public buildNetwork(tolerances:Tolerances):Network{
    let newNetwork = new Network();
    for(let dir of Directions){
      newNetwork.createConnection(newNetwork.foodNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.food);
      newNetwork.createConnection(newNetwork.bodyNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.body);
      newNetwork.createConnection(newNetwork.wallNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.wall);
      newNetwork.createConnection(newNetwork.rockNeurons[dir].id, newNetwork.outputNeurons[dir].id, tolerances.rock);
    }
    return newNetwork;
  }
}
