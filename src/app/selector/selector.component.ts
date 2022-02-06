import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { PlayComponent } from '../play/play.component';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  menu = [
    { text: 'Home', icon: 'home', component: HomeComponent },
    { text: 'Play', icon: 'calculator', component: PlayComponent },
  ]
  actual: any = this.menu[0].component;

  constructor() { }

  public select(index: number): void {
    this.actual = this.menu[index].component;
  }

  ngOnInit(): void {
  }

}
