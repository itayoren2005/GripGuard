import { IsNumber, Min } from 'class-validator';

export class TriangleLengthDto {
  @IsNumber()
  @Min(0)
  triangleLength: number;
}
