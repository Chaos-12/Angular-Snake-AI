import { Connection, Network, Neuron, NeuronType } from "src/main/logic";

export function mutateAddConnection(network:Network):void{
  //We compute how many neurons are available to connect
  network.orderNetwork();
  let neuronsInHigherLayers = new Array<number>(network.neuronsPerLayer.length);
  neuronsInHigherLayers[neuronsInHigherLayers.length-1] = 0;
  for (let layer = neuronsInHigherLayers.length-2; layer >= 0; layer --){
    neuronsInHigherLayers[layer] = neuronsInHigherLayers[layer+1] + network.neuronsPerLayer[layer+1];
  }
  //We choose a neuron that can have a new connection
  let validNeurons = new Array<Neuron>();
  network.neuronMap.forEach(neuron => {
    if(neuron.connections.size < neuronsInHigherLayers[neuron.layer]){
      validNeurons.push(neuron);
    }
  })
  if(validNeurons.length === 0){
    return;
  }
  let startNeuron = validNeurons[Math.floor(Math.random()*validNeurons.length)];
  //We choose a neuron that can be connected
  validNeurons = new Array<Neuron>();
  network.neuronMap.forEach(neuron => {
    if(startNeuron.layer < neuron.layer && !startNeuron.connections.has(neuron.id)){
      validNeurons.push(neuron);
    }
  })
  if(validNeurons.length === 0){
    return;
  }
  let finalNeuron = validNeurons[Math.floor(Math.random()*validNeurons.length)];
  //We create a new connection with random weight
  network.createConnection(startNeuron.id, finalNeuron.id, 1-Math.random()*2, true);
}

export function mutateAddNeuron(network:Network):void{
  let validConnections = new Array<Connection>();
  let biasId = network.biasNeuron.id;
  network.connections.forEach(connection => {
    if(connection.enabled && connection.start.id !== biasId){
      validConnections.push(connection);
    }
  })
  if (validConnections.length === 0){
    return;
  }
  let connection = validConnections[Math.floor(Math.random()*validConnections.length)];
  let newNeuronId = network.neuronMap.size;
  network.createNeuron(NeuronType.hidden, newNeuronId);
  network.createConnection(connection.start.id, newNeuronId, 1, true);
  network.createConnection(newNeuronId, connection.final.id, connection.weight, true);
  connection.enabled = false;
}
