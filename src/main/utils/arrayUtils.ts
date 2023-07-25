import { Evaluator } from "src/main/interface";

export class ArrayUtils {

  public static order<T>(array:Array<T>, evaluator:Evaluator<T>):Array<T>{
    if (!array.length){
      return [];
    }
    let orderedArray = new Array<T>();
    let isItemUnordered = true;
    for (let item of array){
      isItemUnordered = true;
      for(let index = 0; index < orderedArray.length && isItemUnordered; index ++){
        if(evaluator(item) > evaluator(orderedArray[index])){
          ArrayUtils.addItem(orderedArray, item, index);
          isItemUnordered = false;
        }
      }
      if (isItemUnordered){
        orderedArray.push(item);
      }
    }
    return orderedArray;
  }

  public static addItem<T>(array:Array<T>, item:T, index:number):Array<T>{
    return array.splice(index, 0, item);
  }

  public static removeAtIndex<T>(array:Array<T>, index:number):Array<T>{
    return array.splice(index, 1);
  }
}
