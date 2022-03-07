import { Connection, Neuron, NeuronType } from "../index";

export class Network {

  public neuronMap:Map<number,Neuron> = new Map<number,Neuron>();

  public biasNeuron:Neuron = new Neuron(NeuronType.bias, 0);
  public inputNeurons:Array<Neuron> = [];
  public hiddenNeurons:Array<Neuron> = [];
  public outputNeurons:Array<Neuron> = [];

  public deepness = 1;

  constructor(private readonly nInputs:number, private readonly nOutputs:number){
    this.createNeuron(NeuronType.bias, 0);
    for(let i=0; i < nInputs; i++){
      this.createNeuron(NeuronType.input);
    }
    for(let i=0; i < nOutputs; i++){
      this.createNeuron(NeuronType.output);
    }
  }

  public createNeuron(type:NeuronType, id:number = this.neuronMap.size):void{
    let newNeuron = new Neuron(type, id);
    switch(type){
      case NeuronType.bias:
        this.biasNeuron = newNeuron;
        break;
      case NeuronType.input:
        this.inputNeurons.push(newNeuron);
        break;
      case NeuronType.hidden:
        this.hiddenNeurons.push(newNeuron);
        this.createConnection(this.biasNeuron.id, newNeuron.id, 1);
        break;
      case NeuronType.output:
        this.outputNeurons.push(newNeuron);
        this.createConnection(this.biasNeuron.id, newNeuron.id, 1);
        break;
    }
    this.neuronMap.set(id, newNeuron);
  }

  public createConnection(startId:number, finalId:number, weight:number = 1):void{
    let startNeuron = this.neuronMap.get(startId);
    let finalNeuron = this.neuronMap.get(finalId);
    if (startNeuron === undefined || finalNeuron === undefined){
      return;
    }
    let link = new Connection(startNeuron, finalNeuron, weight);
    startNeuron.addConnection(link);
  }

  public propagateInput(input:Array<number>):void{
    if (this.inputNeurons.length !== input.length){
      return;
    }
    //Set the weights of all neurons
    this.biasNeuron.weight = 1;
    for (let neuron of this.inputNeurons){
      neuron.weight = input[neuron.id-1];
    }
    for (let neuron of this.hiddenNeurons){
      neuron.weight = 0;
    }
    for (let neuron of this.outputNeurons){
      neuron.weight = 0;
    }
    //Propagate the weights (in order)
    this.biasNeuron.propagateWeight();
    for (let neuron of this.inputNeurons){
      neuron.propagateWeight();
    }
    for (let neuron of this.hiddenNeurons){
      neuron.propagateWeight();
    }
  }

  public obtainOutput():number{
    let index = 0;
    let maximum = this.outputNeurons[0].weight;
    for (let neuron of this.outputNeurons){
      if (maximum < neuron.weight){
        maximum = neuron.weight;
        index = this.outputNeurons.indexOf(neuron);
      }
    }
    return index;
  }

  public orderNetwork(){
    //Assign layer 0 to input neuronMap (and propagate from them)
    for (let neuron of this.inputNeurons){
      neuron.assignLayer(0);
    }
    //The deepness of the network is the highest between output neuronMap
    this.deepness = 1;
    for (let neuron of this.outputNeurons){
      if (this.deepness < neuron.layer){
        this.deepness = neuron.layer;
      }
    }
    //All output neurons should be at the same (last) layer
    for (let neuron of this.outputNeurons){
      neuron.assignLayer(this.deepness);
    }
    //We order the neurons acording to the layers
    this.hiddenNeurons = [];
    for (let d = 0; d <= this.deepness; d++){
      let positionInLayer = 0;
      for (let neuron of this.neuronMap.values()){
        if (neuron.layer === d){
          neuron.index = positionInLayer;
          positionInLayer ++;
          if (neuron.type === NeuronType.hidden){
            this.hiddenNeurons.push(neuron);
          }
        }
      }
    }
  }
}
