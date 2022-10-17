export class MathUtils {

  public static getOrderedIndexesOf(list:Array<number>):Array<number>{
    if(list.length === 1){
      return [0];
    }
    let length = list.length;
    let indexList = new Array<number>(length);
    for(let i=0; i<length; i++){
      indexList[i] = i;
    }
    for(let i=0; i<length; i++){
      for(let j=i+1; j<length; j++){
        if(list[indexList[i]] < list[indexList[j]]){
          let aux = indexList[j];
          indexList[j] = indexList[i];
          indexList[i] = aux;
        }
      }
    }
    return indexList;
  }
}
