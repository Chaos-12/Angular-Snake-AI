import { Direction, Information, InfoType, InputTypes } from "src/main/data";

export class Input {

  public infoList:Array<Information> = [];

  constructor(){
    for (let input of InputTypes){
      this.infoList.push(new Information());
    }
  }

  public getValue(infoType:InfoType, direction:Direction):number{
    return this.infoList[infoType].getValue(direction);
  }

  public setInformation(infoType:InfoType, information:Information):void{
    if(infoType === InfoType.output){
      throw new Error("Error: information cannot set as infoType='output'.")
    }
    this.infoList[infoType] = information;
  }
}
