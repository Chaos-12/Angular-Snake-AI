import { Connection, Direction, Directions, InputOld, InputType, Cell, NeuronType } from "src/main/data";
import { ArrayUtils, InnovationUtils } from "src/main/utils";

export class Network {

  public neuronMap:Map<number,Cell> = new Map<number,Cell>();

  public biasNeuron:Cell = new Cell(NeuronType.bias, 0);

  public foodNeurons:Array<Cell> = [];
  public bodyNeurons:Array<Cell> = [];
  public wallNeurons:Array<Cell> = [];
  public rockNeurons:Array<Cell> = [];
  get inputNeurons():Array<Cell>{
    return this.foodNeurons.concat(this.bodyNeurons, this.wallNeurons, this.rockNeurons);
  }

  public hiddenNeurons:Array<Cell> = [];
  public outputNeurons:Array<Cell> = [];

  public connections:Map<number,Connection> = new Map();
  public innovation:number = 0;

  public neuronsPerLayer:Array<number> = new Array();

  constructor(){
    this.createNeuron(NeuronType.bias, 0);
    for(let dir of Directions){
      this.createInputNeuron(InputType.food);
      this.createInputNeuron(InputType.body);
      this.createInputNeuron(InputType.wall);
      this.createInputNeuron(InputType.rock);
      this.createNeuron(NeuronType.output);
    }
  }

  public createNeuron(type:NeuronType, id:number=this.neuronMap.size):void{
    if(this.neuronMap.has(id)){
      return;
    }
    let newNeuron = new Cell(type, id);
    switch(type){
      case NeuronType.bias:
        this.biasNeuron = newNeuron;
        this.neuronMap.set(id, newNeuron);
        break;
      case NeuronType.input:
        throw new Error('Input Neuron should be created with specific method.');
      case NeuronType.hidden:
        this.hiddenNeurons.push(newNeuron);
        this.neuronMap.set(id, newNeuron);
        this.createConnection(this.biasNeuron.id, newNeuron.id, 1, true);
        break;
      case NeuronType.output:
        this.outputNeurons.push(newNeuron);
        this.neuronMap.set(id, newNeuron);
        this.createConnection(this.biasNeuron.id, newNeuron.id, 1, true);
        break;
    }
  }

  private createInputNeuron(type:InputType, id:number = this.neuronMap.size):void{
    if(this.neuronMap.has(id)){
      return;
    }
    let newNeuron = new Cell(NeuronType.input, id);
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

  public createConnection(startId:number, finalId:number, weight:number=1, enabled=true):void{
    let startNeuron = this.neuronMap.get(startId);
    let finalNeuron = this.neuronMap.get(finalId);
    if (startNeuron === undefined || finalNeuron === undefined){
      throw new Error('No connection can be created since the network lacks the neurons involved');
    }
    let newLink = new Connection(startNeuron, finalNeuron, weight, enabled);
    startNeuron.addConnection(newLink);
    let newInnovation = InnovationUtils.getOrCreateInnovation(startId, finalId);
    this.connections.set(newInnovation, newLink);
    if(newInnovation > this.innovation){
      this.innovation = newInnovation;
    }
  }

  public propagateInput(input:InputOld):void{
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
    return ArrayUtils.getOrderedIndexesOf(output);
  }

  public orderNetwork():void{
    //Assign layer 0 to input neuronMap (and propagate from them)
    for (let neuron of this.inputNeurons){
      neuron.assignLayer(0);
    }
    //The deepness of the network is the highest between output neuronMap
    let deepness = 1;
    for (let neuron of this.outputNeurons){
      if (deepness < neuron.layer){
        deepness = neuron.layer;
      }
    }
    //All output neurons should be at the same (last) layer
    for (let neuron of this.outputNeurons){
      neuron.assignLayer(deepness);
    }
    //We order the neurons acording to the layers
    this.hiddenNeurons = [];
    this.neuronsPerLayer = new Array<number>(deepness);
    for (let d = 0; d <= deepness; d++){
      let positionInLayer = 0;
      this.neuronsPerLayer[d] = 0;
      for (let neuron of this.neuronMap.values()){
        if (neuron.layer === d){
          neuron.index = positionInLayer;
          positionInLayer ++;
          this.neuronsPerLayer[d] ++;
          if (neuron.type === NeuronType.hidden){
            this.hiddenNeurons.push(neuron);
          }
        }
      }
    }
  }
}
