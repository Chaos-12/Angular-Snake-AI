import { Injectable } from "@angular/core";
import { Brain, Information, InputType, Link, Directions, NeuronMap, InfoNeuron, Input, InputTypes, Direction, Neuron, InputNeuron } from "src/main/data";
import { NeuronLogic } from "./neuronLogic";

@Injectable()
export class BrainLogic {

  constructor(private neuronLogic:NeuronLogic){ }

  public buildDefaultBrain():Brain{
    //Bias neuron created by default
    let brain = new Brain();
    let id = 1;
    //Create input neurons
    for (let infoType of InputTypes){
      for (let direction of Directions){
        this.addInfoNeuronTo(brain, id, direction, infoType);
        id ++;
      }
    }
    //Create output neurons
    for (let direction of Directions){
      this.addInfoNeuronTo(brain, id, direction, undefined);
      id ++;
    }
    return brain;
  }

  private addInfoNeuronTo(brain:Brain, id:number, direction:Direction, info:InputType|undefined){
    if (undefined === info){
      brain.outputs.push(new InfoNeuron(id, direction));
    } else {
      brain.inputs.push(new InputNeuron(id, direction, info));
    }
  }

  public addNeuronTo(brain:Brain, id:number):void{
    brain.hidden.push(new Neuron(id));
  }

  public createLink(neurons:NeuronMap, startId:number, finalId:number, weight:number, enabled:boolean){
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

  public propagateInput(brain:Brain, input:Input):void{
    //Set the weights of all neurons
    for (let neuron of brain.inputs){
      this.neuronLogic.setInfo(neuron, input);
    }
    for (let neuron of brain.hidden){
      this.neuronLogic.setValue(neuron, 0);
    }
    for (let neuron of brain.outputs){
      this.neuronLogic.setValue(neuron, 0);
    }
    //Propagate the weights (we assume that the brain is ordered)
    this.neuronLogic.propagateValueFrom(brain.bias);
    for (let neuron of brain.inputs){
      this.neuronLogic.propagateValueFrom(neuron);
    }
    for (let neuron of brain.hidden){
      this.neuronLogic.propagateValueFrom(neuron);
    }
  }

  public obtainOutput(brain:Brain):Information{
    let information = new Information();
    brain.outputs.forEach(neuron => information.setValue(neuron.direction, neuron.value))
    return information;
  }

  public order(brain:Brain):void{

  }
}
