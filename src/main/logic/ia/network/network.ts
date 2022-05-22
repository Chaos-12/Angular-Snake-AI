import { Connection, Neuron, NeuronType, Directions, Input, InputType, Direction } from "src/main/logic";
import { MathUtils } from "src/main/utils";

export class Network {

  public neuronMap:Map<number,Neuron> = new Map<number,Neuron>();

  public biasNeuron:Neuron = new Neuron(NeuronType.bias, 0);

  public foodNeurons:Array<Neuron> = [];
  public bodyNeurons:Array<Neuron> = [];
  public wallNeurons:Array<Neuron> = [];
  public rockNeurons:Array<Neuron> = [];
  get inputNeurons():Array<Neuron>{
    return this.foodNeurons.concat(this.bodyNeurons, this.wallNeurons, this.rockNeurons);
  }

  public hiddenNeurons:Array<Neuron> = [];
  public outputNeurons:Array<Neuron> = [];

  public deepness = 1;

  constructor( ){
    this.createNeuron(NeuronType.bias, 0);
    for(let dir of Directions){
      this.createInputNeuron(InputType.food);
      this.createInputNeuron(InputType.body);
      this.createInputNeuron(InputType.wall);
      this.createInputNeuron(InputType.rock);
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
        throw new Error('Input Neuron should be created with specific method.');
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

  private createInputNeuron(type:InputType, id:number = this.neuronMap.size):void{
    let newNeuron = new Neuron(NeuronType.input, id);
    switch(type){
      case InputType.food:
        this.foodNeurons.push(newNeuron);
        break;
      case InputType.body:
        this.bodyNeurons.push(newNeuron);
        break;
      case InputType.wall:
        this.wallNeurons.push(newNeuron);
        break;
      case InputType.rock:
        this.rockNeurons.push(newNeuron);
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
    let newLink = new Connection(startNeuron, finalNeuron, weight);
    startNeuron.addConnection(newLink);
  }

  public propagateInput(input:Input):void{
    let nDirections = Directions.length;
    //Set the new weights of all neurons
    this.biasNeuron.weight = 1;
    for (let dir of Directions){
      this.foodNeurons[dir].weight = input.food[dir];
      this.bodyNeurons[dir].weight = input.body[dir];
      this.wallNeurons[dir].weight = input.wall[dir];
      this.rockNeurons[dir].weight = input.rock[dir];
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

  public obtainOutput():Array<Direction>{
    let output = new Array<number>(Directions.length);
    for(let dir of Directions){
      output[dir] = this.outputNeurons[dir].weight;
    }
    return MathUtils.getOrderedIndexesOf(output);
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
