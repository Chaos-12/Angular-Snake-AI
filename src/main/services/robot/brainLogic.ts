import { Injectable } from "@angular/core";
import { Brain, Information, InputType, Link, Directions, NeuronMap, Input, InputTypes, Direction, Neuron, Tolerances } from "src/main/data";
import { NeuronLogic } from "src/main/services";

@Injectable()
export class BrainLogic {

  constructor(private neuronLogic:NeuronLogic){ }

  public buildDefaultBrain():Brain{
    //Bias neuron created by default
    let brain = new Brain();
    let id = 0;
    //Create input neurons
    for (let infoType of InputTypes){
      for (let direction of Directions){
        this.addInputNeuronTo(brain, id);
        id ++;
      }
    }
    //Create output neurons
    for (let direction of Directions){
      this.addOutputNeuronTo(brain, id, direction);
      id ++;
    }
    return brain;
  }

  public getInputNeuronFrom(brain:Brain, inputType:InputType, direction:Direction):Neuron{
    return brain.inputs[inputType * Directions.length + direction];
  }

  public getOutputNeuronFrom(brain:Brain, direction:Direction):Neuron{
    return brain.outputs[direction];
  }

  private addInputNeuronTo(brain:Brain, id:number):void{
    let neuron = new Neuron(id);
    this.neuronLogic.setIndex(neuron, id);
    brain.inputs.push(neuron);
  }

  private addOutputNeuronTo(brain:Brain, id:number, direction:Direction):void{
    let neuron = new Neuron(id);
    this.neuronLogic.setIndex(neuron, direction);
    brain.outputs.push(neuron);
  }

  public addHiddenNeuronTo(brain:Brain, id:number):void{
    brain.hidden.push(new Neuron(id));
  }

  public buildBrainFrom(tolerances:Tolerances):Brain{
    let brain = this.buildDefaultBrain();
    for(let direction of Directions){
      let final = this.getOutputNeuronFrom(brain, direction);
      for(let inputType of InputTypes){
        let start = this.getInputNeuronFrom(brain, inputType, direction);
        let link = new Link(start, final, tolerances.getValue(inputType), true);
        this.neuronLogic.addLinkTo(start, link);
      }
    }
    return brain;
  }

  public createLink(neurons:NeuronMap, startId:number, finalId:number, weight:number, enabled:boolean):void{
    let startNeuron = neurons.get(startId);
    if ( !startNeuron ){
      throw new Error(`Error in the creation of the link: no neuron with id=${startId} found.`)
    }
    let finalNeuron = neurons.get(finalId);
    if ( !finalNeuron ){
      throw new Error(`Error in the creation of the link: no neuron with id=${finalId} found.`)
    }
    let link = new Link(startNeuron, finalNeuron, weight, enabled);
    this.neuronLogic.addLinkTo(startNeuron, link);
  }

  public propagateInputInto(brain:Brain, input:Input):void{
    //Set the weights of all neurons
    for (let inputType of InputTypes){
      for (let direction of Directions){
        let neuron = this.getInputNeuronFrom(brain, inputType, direction);
        let value = input.getInfo(inputType, direction);
        this.neuronLogic.setValue(neuron, value);
      }
    }
    for (let neuron of brain.hidden){
      this.neuronLogic.setValue(neuron, 0);
    }
    for (let neuron of brain.outputs){
      this.neuronLogic.setValue(neuron, 0);
    }
    //Propagate the weights (we assume that the hidden neurons are ordered)
    this.neuronLogic.propagateValueFrom(brain.bias);
    for (let neuron of brain.inputs){
      this.neuronLogic.propagateValueFrom(neuron);
    }
    for (let neuron of brain.hidden){
      this.neuronLogic.propagateValueFrom(neuron);
    }
  }

  public obtainOutputFrom(brain:Brain):Information{
    let information = new Information();
    for (let direction of Directions){
      let neuron = this.getOutputNeuronFrom(brain, direction);
      information.setValue(direction, neuron.value);
    }
    return information;
  }

  public order(brain:Brain):void{
    //Assign layer 0 to input neurons (and propagate)
    for(let neuron of brain.inputs){
      this.neuronLogic.assignDeepnessTo(neuron, 0);
    }
    //The deph of the brain is the highest among output neurons
    let deph = 1;
    for (let neuron of brain.outputs){
      if (deph < neuron.depth){
        deph = neuron.depth;
      }
    }
    //All output neurons should have the same deph
    for (let neuron of brain.outputs){
      this.neuronLogic.assignDeepnessTo(neuron, deph);
    }
    //We order the hidden neurons acording to the already assing deph
    let orderedNeurons = new Array<Neuron>();
    for (let d=1; d < deph; d++){
      let index = 0;
      let justOrderedNeurons = new Array<Neuron>();
      for(let neuron of brain.hidden){
        if(neuron.depth == d){
          this.neuronLogic.setIndex(neuron, index);
          index ++;
          justOrderedNeurons.push(neuron);
        }
      }
      for(let neuron of justOrderedNeurons){
        index = brain.hidden.indexOf(neuron);
        brain.hidden.splice(index, 1);
      }
      orderedNeurons = orderedNeurons.concat(justOrderedNeurons);
    }
    brain.hidden = orderedNeurons;
  }
}
