export enum InfoType {
  output = -1,
  food, body, wall, rock
}

export const InputTypes:Array<InfoType> = [InfoType.food, InfoType.body, InfoType.wall, InfoType.rock];

export const InfoTypes:Array<InfoType> = InputTypes.concat([InfoType.output]);
