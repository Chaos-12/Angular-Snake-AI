import { Injectable } from "@angular/core";
import { Directions, Network, TolerancesOld } from "src/main/data";

@Injectable()
export class NetworkBuilder {

  public buildNetwork(tolerances:TolerancesOld):Network{
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
