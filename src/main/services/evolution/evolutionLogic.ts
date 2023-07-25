import { Injectable } from "@angular/core";
import { Robot } from "src/main/data";
import { NeatLogic } from "src/main/services";

@Injectable()
export class EvolutionLogic {

  constructor(private neatLogic:NeatLogic){ }

  public computeNextGeneration(population:Array<Robot>):Array<Robot>{
    return population;
  }
}
