import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Direction, DirectionLabels } from "src/main/enum";
import { Neuron } from "src/main/logic";


@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements OnInit {

  public labels = DirectionLabels;

  @Input()
  public title:string="";

  @Input()
  public value:number=0;

  @Input()
  public inputs:Array<Neuron>=[];

  @HostBinding('style.--input-value-north')
  public get northValue(){
    return `${this.inputs[Direction.north].weight*100}%`;
  }

  @HostBinding('style.--input-value-south')
  public get southValue(){
    return `${this.inputs[Direction.south].weight*100}%`;
  }

  @HostBinding('style.--input-value-east')
  public get eastValue(){
    return `${this.inputs[Direction.east].weight*100}%`;
  }

  @HostBinding('style.--input-value-west')
  public get westValue(){
    return `${this.inputs[Direction.west].weight*100}%`;
  }

  constructor(){ }

  ngOnInit(): void {
  }
}
