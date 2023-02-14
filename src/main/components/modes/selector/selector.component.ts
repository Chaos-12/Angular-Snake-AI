import { Component, OnInit } from '@angular/core';
import { CreateComponent, HomeComponent, PlayComponent } from 'src/main/components/modes';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  menu = [
    { text: 'Home', component: HomeComponent },
    { text: 'Play', component: PlayComponent },
    { text: 'Create', component: CreateComponent},
  ]
  actual: any = this.menu[0].component;

  constructor() { }

  public select(index: number): void {
    this.actual = this.menu[index].component;
  }

  ngOnInit(): void {
  }

}
