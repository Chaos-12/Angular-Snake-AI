import { ISubscriber } from "src/main/utils";

export class PubSub {
  private interest : Map<String, Set<ISubscriber>>;

  constructor(){
    this.interest = new Map<String, Set<ISubscriber>>();
  }

  public post(message:any, subject:String){
    let subscribers = this.interest.get(subject);
    subscribers?.forEach(sub => sub.notify(message));
  }

  public subscribe(subscriber:ISubscriber, subject:String):CallableFunction{
    let subscribers = this.interest.get(subject);
    if (subscribers === undefined || subscribers === null){
      subscribers = new Set<ISubscriber>();
    }
    subscribers.add(subscriber);
    this.interest.set(subject, subscribers);
    return () => this.unsubscribe(subscriber, subject);
  }

  private unsubscribe(subscriber:ISubscriber, subject:String):void{
    let subscribers = this.interest.get(subject);
    if (subscribers === undefined || subscribers === null){
      return;
    }
    if (!subscribers.has(subscriber)){
      return;
    }
    if (subscribers.size === 1){
      this.interest.delete(subject);
    } else {
      subscribers.delete(subscriber);
    }
  }
}
