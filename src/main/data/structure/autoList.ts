import { Operation } from "src/main/interface";

export class AutoList<Value> {

  private valueList:Array<Value> = []

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
    this.valueList.map( value => operation(value) );
    return this;
  }
}
