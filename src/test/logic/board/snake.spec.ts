import { SnakeDeath } from "src/main/enum";
import { Snake } from "src/main/logic"
import { TestUtils } from "src/test/testUtils";


describe(TestUtils.title('Snake'), function(){

  it('Counters start at 0', function(){
    let snake = new Snake();
    expect(snake.nFood).toBe(0);
    expect(snake.nSteps).toBe(0);
  })

  describe('Right starting size', function(){
    [1,2,5].forEach(size => {
      it(`size ${size}`, function(){
        let snake = new Snake(size);
        expect(snake.length).toBe(size);
      })
    })
  })

  it('Eating test', function(){
    let snake = new Snake();
    let size = snake.length;
    snake.move(true);
    expect(snake.nFood).toBe(1);
    expect(snake.length).toBe(size+1);
  })

  it('Moving test', function(){
    let snake = new Snake();
    let size = snake.length;
    let newPosition = snake.head.forward(snake.direction);
    expect(snake.contains(newPosition)).toBeFalse();
    snake.move(false);
    expect(snake.length).toBe(size);
    expect(snake.contains(newPosition)).toBeTrue();
  })

  describe('Death test', function(){
    [SnakeDeath.bite, SnakeDeath.wall, SnakeDeath.rock].forEach(deathReason => {
      it(`Death by ${deathReason}`, function(){
        let snake = new Snake();
        expect(snake.isAlive).toBeTrue();
        snake.kill(deathReason);
        expect(snake.isAlive).toBeFalse();
        expect(snake.deathReason).toMatch(deathReason.toString());
      })
    })
  })
})
