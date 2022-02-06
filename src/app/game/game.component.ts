import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public height = 9;
  public width = 16;

  public title : string = "Regular game";

  public screen : any;

  public food:number = 7;

  private score : number = 0;
  private record : number = 0;
  private snake : number[] = [2,3,4];
  private nFoods : number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.screen = document.querySelector('.game-board');
    this.drawSnake();
    this.drawFood();
  }

  public drawSnake(){
    this.snake.forEach(body => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridColumnStart = body.toString();
      // snakeElement.style.backgroundColor = 'black';
      snakeElement.classList.add('snake');
      this.screen.appendChild(snakeElement);
    });
  }

  public drawFood(){
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = this.food.toString();
    foodElement.classList.add('food');
    this.screen.appendChild(foodElement);
  }
}
