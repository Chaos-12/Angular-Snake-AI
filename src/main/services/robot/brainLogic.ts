import { Injectable } from "@angular/core";
import { Brain, Information, InfoType, Link, Directions, NeuronMap, InfoNeuron, Input, InputTypes, Direction, Neuron } from "src/main/data";
import { NeuronLogic } from "./neuronLogic";

@Injectable()
export class BrainLogic {

  private links:Map<number,Link> = new Map<number,Link>();
  private innovation:number = 0;

  constructor(private neuronLogic:NeuronLogic){ }

  public reset():void{
    this.links = new Map<number,Link>();
    this.innovation = 0;
  }

  public buildDefaultBrain():Brain{
    //Bias neuron created by default
    let brain = new Brain();
    let id = 1;
    //Create input neurons
    for (let infoType of InputTypes){
      for (let direction of Directions){
        this.addInfoNeuronTo(brain, id, infoType, direction);
        id ++;
      }
    }
    //Create output neurons
    for (let direction of Directions){
      this.addInfoNeuronTo(brain, id, InfoType.output, direction);
      id ++;
    }
    return brain;
  }

  private addInfoNeuronTo(brain:Brain, id:number, info:InfoType, direction:Direction){
    let neuron = new InfoNeuron(id, info, direction);
    if (InfoType.output === info){
      brain.outputs.push(neuron);
    } else {
      brain.inputs.push(neuron);
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
      neuron.value = input.getValue(neuron.info, neuron.direction);
    }
    for (let neuron of brain.hidden){
      neuron.value = 0;
    }
    for (let neuron of brain.outputs){
      neuron.value = 0;
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
