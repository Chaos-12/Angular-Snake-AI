export class InnovationUtils {

  private static maxInnovation = 0;

  private static innovationMap:Map<number,Map<number,number>> = new Map();

  public static getOrCreateInnovation(startId:number, finalId:number):number{
    let startConnections = this.innovationMap.get(startId);
    if (startConnections === undefined){
      startConnections = new Map<number, number>();
      this.innovationMap.set(startId, startConnections);
    }
    let innovationNumber = startConnections.get(finalId);
    if (innovationNumber === undefined){
      innovationNumber = InnovationUtils.maxInnovation ++;
      startConnections.set(finalId, innovationNumber);
    }
    return innovationNumber;
  }

  public static resetInnovation():void{
    InnovationUtils.maxInnovation = 0;
    InnovationUtils.innovationMap = new Map();
  }
}
