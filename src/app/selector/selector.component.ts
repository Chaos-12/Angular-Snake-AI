import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  menu = [
    { text: 'Home', icon: 'home', component: HomeComponent },
    { text: 'User', icon: 'calculator', component: ViewUserComponent },
  ]
  actual: any = this.menu[0].component;

  constructor() { }

  public select(index: number): void {
    this.actual = this.menu[index].component;
  }

  ngOnInit(): void {
  }

}
