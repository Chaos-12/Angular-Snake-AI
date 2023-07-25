import { Injectable } from "@angular/core";
import { Robot, Species } from "src/main/data";
import { ArrayUtils } from "src/main/utils";

@Injectable()
export class speciesLogic {

  public addSpecimenTo(species:Species, robot:Robot):void{
    species.population.push(robot);
  }

  public orderPopulationOf(species:Species){
    let orderedPopulation = ArrayUtils.order(species.population, (robot) => robot.snake.record);
    species.population = orderedPopulation;
  }

}
