import { InnovationUtil } from "src/main/utils";
import { Network, NeuronType } from "src/main/logic";


export class AiMerger {

  constructor(){ }

  public mergeNetworks(father:Network, mother:Network):Network{
    //Create a new Network
    let child = new Network();
    //Create all the hidden nodes of the parents
    for(let neuron of father.hiddenNeurons.concat(mother.hiddenNeurons)){
      child.createNeuron(NeuronType.hidden, neuron.id);
    }
    //Create all the connections of the parents
    for(let connectionId of new Set([...father.connections, ...mother.connections])){
      let startId = InnovationUtil.getStart(connectionId);
      let finalId = InnovationUtil.getFinal(connectionId);
      let fatherConnection = father.getConnection(startId, finalId);
      let activeOnFather = fatherConnection !== undefined && fatherConnection.enabled;
      let motherConnection = mother.getConnection(startId, finalId);
      let activeOnMother = motherConnection !== undefined && motherConnection.enabled;
      if (activeOnFather === activeOnMother){
        if (Math.random() < 0.5){
          child.createConnection(startId, finalId, fatherConnection?.weight, activeOnFather);
        } else {
          child.createConnection(startId, finalId, motherConnection?.weight, activeOnMother);
        }
      } else {
        if (activeOnFather){
          child.createConnection(startId, finalId, fatherConnection?.weight, activeOnFather);
        } else {
          child.createConnection(startId, finalId, motherConnection?.weight, activeOnMother);
        }
      }
    }
    return child;
  }
}
