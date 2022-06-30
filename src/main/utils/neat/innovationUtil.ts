export class InnovationUtil {

  private static maxInnovation = 0;

  private static startMap:Map<number,number> = new Map();
  private static finalMap:Map<number,number> = new Map();

  private static innovationMap:Map<number,Map<number,number>> = new Map();

  public static getOrCreateInnovation(startId:number, finalId:number):number{
    let startConnections = this.innovationMap.get(startId);
    if (startConnections === undefined){
      startConnections = new Map();
    }
    let innovationNumber = startConnections.get(finalId);
    if (innovationNumber === undefined){
      innovationNumber = InnovationUtil.maxInnovation ++;
      startConnections.set(finalId, innovationNumber);
      this.innovationMap.set(startId, startConnections);
      this.startMap.set(innovationNumber, startId);
      this.finalMap.set(innovationNumber, finalId);
    }
    return innovationNumber;
  }

  public static getStart(innovation:number):number{
    let startId = this.startMap.get(innovation);
    if(startId === undefined){
      throw new Error(`Connection with id=${innovation} has no start node`)
    }
    return startId;
  }

  public static getFinal(innovation:number):number{
    let finalId = this.finalMap.get(innovation);
    if(finalId === undefined){
      throw new Error(`Connection with id=${innovation} has no final node`)
    }
    return finalId;
  }
}
