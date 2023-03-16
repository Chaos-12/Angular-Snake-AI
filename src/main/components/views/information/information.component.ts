import { Component, HostBinding, Input } from "@angular/core";
import { Direction, DirectionLabels, Information } from "src/main/data";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {

  public labels = DirectionLabels;

  @Input()
  public title:string="";

  @Input()
  public text:string="";

  @Input()
  public information!:Information;

  @HostBinding('style.--input-value-north')
  public get northValue(){
    return `${this.information.getValue(Direction.north)*100}%`;
  }

  @HostBinding('style.--input-value-south')
  public get southValue(){
    return `${this.information.getValue(Direction.south)*100}%`;
  }

  @HostBinding('style.--input-value-east')
  public get eastValue(){
    return `${this.information.getValue(Direction.east)*100}%`;
  }

  @HostBinding('style.--input-value-west')
  public get westValue(){
    return `${this.information.getValue(Direction.west)*100}%`;
  }
}
