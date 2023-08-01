import { TestBed } from "@angular/core/testing";
import { Board, Food, Position, PositionSetList } from "src/main/data";
import { BoardLogic, PositionLogic, SnakeLogic } from "src/main/services";
import { TestUtils } from "src/test/testUtils";

TestUtils.testClass('BoardLogic', function(){

  //Service with dependencies
  let boardLogic:BoardLogic;
  let snakeLogic:jasmine.SpyObj<SnakeLogic>;
  let positionLogic:jasmine.SpyObj<PositionLogic>;

  beforeAll( function(){
    // Creation of the dependency mocks
    const snakeLogicMock = jasmine.createSpyObj('SnakeLogic', ['create']);
    const positionLogicMock = jasmine.createSpyObj('PositionLogic', ['findFoodPosition', 'findRockPosition']);

    // Provide both the service-to-test and its (mock) dependencies
    TestBed.configureTestingModule({
      providers: [
        BoardLogic,
        { provide: SnakeLogic, useValue: snakeLogicMock },
        { provide: PositionLogic, useValue: positionLogicMock }
      ]
    });
    // Inject both the service-to-test and its (mock) dependencies
    boardLogic = TestBed.inject(BoardLogic);
    snakeLogic = TestBed.inject(SnakeLogic) as jasmine.SpyObj<SnakeLogic>;
    positionLogic = TestBed.inject(PositionLogic) as jasmine.SpyObj<PositionLogic>;
  })

  const freePositions = [
    {pos:new Position(1,1)},
    {pos:new Position(11,11)},
    {pos:new Position(5,5)},
    {pos:new Position(2,3)},
    {pos:new Position(6,8)}]

  TestUtils.individualTest('Creation of initial board OK', function(){
    // Given
    const position = new Position(3,3);
    positionLogic.findFoodPosition.and.callFake(() => position);
    const spy = spyOn(boardLogic, 'generateFoodFor').and.callThrough();

    // When
    let testBoard = boardLogic.buildBoard();

    // Then
    expect(testBoard.rocks.length)
      .withContext('Board starts with 0 rocks')
      .toBe(0);

    expect(spy).toHaveBeenCalledOnceWith(testBoard);
    
    expect(testBoard.food.position)
      .withContext('Food position given by positionLogic')
      .toBe(position);
  })

  TestUtils.parameterizedTest('Generate food OK', freePositions, function(param:{pos:Position}){
    // Given
    let board = new Board(11);
    board.food = new Food(new Position(2,4));
    positionLogic.findFoodPosition.and.callFake(() => param.pos);

    // When
    boardLogic.generateFoodFor(board);

    // Then
    expect(board.food.position)
      .withContext('Food generated with positionLogic')
      .toBe(param.pos);
  })

  TestUtils.parameterizedTest('Generate rock OK', freePositions, function(param:{pos:Position}){
    // Given
    let board = new Board(11);
    board.rocks = new PositionSetList();
    positionLogic.findRockPosition.and.callFake(() => param.pos);
    
    // When
    boardLogic.generateRockFor(board);

    // Then
    expect(board.rocks.length)
      .withContext('We have 1 rock now')
      .toBe(1);

    expect(board.rocks.list[0])
      .withContext('Rock generated with positionLogic')
      .toBe(param.pos);
  })

})

