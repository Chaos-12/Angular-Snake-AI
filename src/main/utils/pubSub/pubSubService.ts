import { Injectable } from "@angular/core";
import { Subscriber, Subject } from "src/main/utils";

@Injectable()
export class PubSubService {
  private interestMap : Map<Subject, Set<Subscriber>>;

  constructor(){
    this.interestMap = new Map<Subject, Set<Subscriber>>();
  }

  public post(subject:Subject, message:any):void{
    let subscribers = this.interestMap.get(subject);
    subscribers?.forEach(sub => sub.notify(message));
  }

  public subscribe(subscriber:Subscriber, subject:Subject):CallableFunction{
    let subscribers = this.interestMap.get(subject);
    if (subscribers === undefined || subscribers === null){
      subscribers = new Set<Subscriber>();
    }
    subscribers.add(subscriber);
    this.interestMap.set(subject, subscribers);
    return () => this.unsubscribe(subscriber, subject);
  }

  private unsubscribe(subscriber:Subscriber, subject:Subject):void{
    let subscribers = this.interestMap.get(subject);
    if (subscribers === undefined || subscribers === null){
      return;
    }
    if (!subscribers.has(subscriber)){
      return;
    }
    if (subscribers.size === 1){
      this.interestMap.delete(subject);
    } else {
      subscribers.delete(subscriber);
    }
  }
}
