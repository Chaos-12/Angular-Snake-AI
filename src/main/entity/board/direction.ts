export enum Direction {
  south = 0, west = 1, north = 2, east = 3,
}

export const Directions:Array<Direction> = [Direction.south, Direction.west, Direction.north, Direction.east];

export const OppositeDirection:Array<Direction> = [Direction.north, Direction.east, Direction.south, Direction.west];

export const DirectionLabels:Array<string> = ["south", "west", "north", "east"];
