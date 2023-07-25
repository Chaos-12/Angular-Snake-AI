import { Injectable } from "@angular/core";
import { ArrayUtils } from "src/main/utils";

@Injectable()
export class IdService {

  private idList: Array<string> = [];

  public generateId(): string{
    let isRepeated = true;
    let newId = "";
    while(isRepeated) {
      newId = this.proposeId();
      if (!this.hasRegistered(newId)){
        isRepeated = false;
        this.idList.push(newId);
      }
    }
    return newId;
  }

  public remove(id: string): void {
    const index = this.idList.indexOf(id);
    if (index >= 0){
      ArrayUtils.removeAtIndex(this.idList, index);
    }
  }

  public reset(): void {
    this.idList = [];
  }

  private hasRegistered(id: string): boolean {
    return this.idList.includes(id);
  }

  private proposeId(): string {
    return `${this.S4()}${this.S4()}`;
  }

  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
