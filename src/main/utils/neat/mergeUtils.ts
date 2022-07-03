import { Connection, Network, NeuronType } from "src/main/logic";


export function mergeNetworks(father:Network, mother:Network, child:Network = new Network()):Network{
  //Create all the hidden nodes of the parents
  for(let neuron of father.hiddenNeurons.concat(mother.hiddenNeurons)){
    child.createNeuron(NeuronType.hidden, neuron.id);
  }
  //Create all the connections of the parents
  for(let fatherConnection of father.connections){
    let motherConnection = mother.connections.get(fatherConnection[0]);
    if (motherConnection === undefined){
      child.createConnection(fatherConnection[1].from.id, fatherConnection[1].to.id, fatherConnection[1].weight, fatherConnection[1].enabled);
    } else {
      mergeConnectionInto(fatherConnection[1], motherConnection, child);
    }
  }
  for(let motherConnection of mother.connections){
    if (!father.connections.has(motherConnection[0])){
      child.createConnection(motherConnection[1].from.id, motherConnection[1].to.id, motherConnection[1].weight, motherConnection[1].enabled);
    }
  }
  child.orderNetwork();
  return child;
}

export function mergeConnectionInto(father:Connection, mother:Connection, network:Network):void{
  if(father.enabled === mother.enabled){
    if(Math.random() < 0.5){
      network.createConnection(father.from.id, father.to.id, father.weight, father.enabled);
    } else {
      network.createConnection(mother.from.id, mother.to.id, mother.weight, mother.enabled);
    }
  } else {
    if(father.enabled){
      network.createConnection(father.from.id, father.to.id, father.weight, father.enabled);
    } else {
      network.createConnection(mother.from.id, mother.to.id, mother.weight, mother.enabled);
    }
  }
}
