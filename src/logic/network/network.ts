import { Connection, Neuron, NeuronType } from "../index";

export class Network {

  public neurons:Map<number,Neuron> = new Map<number,Neuron>();
  public hiddenNeurons:Array<Neuron> = [];

  public deepness = 1;

  constructor(private readonly nInputs:number, private readonly nOutputs:number){
    this.createNeuron(NeuronType.bias);
    for(let i=0; i < nInputs; i++){
      this.createNeuron(NeuronType.input);
    }
    for(let i=0; i < nOutputs; i++){
      this.createNeuron(NeuronType.output);
    }
  }

  public createNeuron(type:NeuronType, id:number = this.neurons.size):void{
    let neuron = new Neuron(type, id);
    this.neurons.set(id, neuron);
    if(type === NeuronType.hidden || type === NeuronType.output){
      this.createConnection(0, id);
    }
  }

  public createConnection(startId:number, finalId:number, weight:number = 1):void{
    let startNeuron = this.neurons.get(startId);
    let finalNeuron = this.neurons.get(finalId);
    if (startNeuron === undefined || finalNeuron === undefined){
      return;
    }
    let link = new Connection(startNeuron, finalNeuron, weight);
    startNeuron.addConnection(link);
  }

  public propagateInput(input:Array<number>):void{
    //Clear the weights of all neurons
    for (let neuron of this.neurons.values()){
      neuron.weight = 0;
    }
    let bias = this.neurons.get(0);
    if (bias !== undefined){
      bias.weight=1;
    }
    //Assign the weights to input neurons
    for (let i=1; i<this.nInputs; i++){
      let inputNeuron = this.neurons.get(i);
      if (inputNeuron !== undefined){
        inputNeuron.weight = input[i];
      }
    }
    //Propagate through hidden neurons
    for (let hiddenNeuron of this.hiddenNeurons){
      hiddenNeuron.propagateWeight();
    }
  }

  public obtainOutput():number{
    let index = this.nInputs+1;
    let maximum = this.neurons.get(index)?.weight;
    if (maximum !== undefined){
      for (let i=1; i <= this.nOutputs; i++){
        let outputNeuron = this.neurons.get(this.nInputs+1+i);
        if (outputNeuron !== undefined && maximum < outputNeuron.weight){
          maximum = outputNeuron.weight;
          index = outputNeuron.id;
        }
      }
    }
    return index - this.nInputs -1;
  }

  public orderNetwork(){
    //Assign layer 0 to input neurons (and propagate from them)
    for (let i=1; i <= this.nInputs; i++){
      this.neurons.get(i)?.assignLayer(0);
    }
    //The deepness of the network is the highest between output neurons
    this.deepness = 1;
    for (let i=this.nInputs+1; i <= this.nInputs+this.nOutputs; i++){
      let outputNeuron = this.neurons.get(i);
      if(outputNeuron !== undefined && this.deepness < outputNeuron.layer){
        this.deepness = outputNeuron.layer;
      }
    }
    //All output neurons should be at the same (last) layer
    for (let i=this.nInputs+1; i <= this.nInputs+this.nOutputs; i++){
      this.neurons.get(i)?.assignLayer(this.deepness);
    }
    //We order the id of the nodes acording to the layers
    this.hiddenNeurons = [];
    for (let d = 0; d <= this.deepness; d++){
      let positionInLayer = 0;
      for (let neuron of this.neurons.values()){
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
