import { IsNumberString } from 'class-validator';

export class ValidParam {
  @IsNumberString()
  id: number;
}
