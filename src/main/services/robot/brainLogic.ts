import { Injectable } from "@angular/core";
import { Brain, Information, InputType, Link, Directions, NeuronMap, InfoNeuron, Input, InputTypes, Direction, Neuron, InputNeuron } from "src/main/data";
import { NeuronLogic } from "src/main/services";

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
        this.addInputNeuronTo(brain, id, direction, infoType);
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

  private addInputNeuronTo(brain:Brain, id:number, direction:Direction, info:InputType){
    let neuron = new InputNeuron(id, direction, info);
    this.neuronLogic.setIndex(neuron, id);
    brain.inputs.push(neuron);
  }

  private addOutputNeuronTo(brain:Brain, id:number, direction:Direction){
    let neuron = new InfoNeuron(id, direction);
    this.neuronLogic.setIndex(neuron, direction);
    brain.outputs.push(neuron);
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
