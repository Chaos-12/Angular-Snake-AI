import { Operation } from "src/main/interface";

export class AutoList<Value> {

  public valueList:Array<Value> = []

  constructor(initialValue:Value, list:Array<number>){
    for (let item of list){
      this.valueList.push(initialValue);
    }
  }

  public getValue(index:number):Value {
    return this.valueList[index];
  }

  public setValue(index:number, value:Value):void {
    this.valueList[index] = value;
  }

  public map(operation:Operation<Value>):AutoList<Value> {
    let newList = new Array<Value>();
    for (let value of this.valueList){
      newList.push(operation(value));
    }
    this.valueList = newList;
    return this;
  }
}
