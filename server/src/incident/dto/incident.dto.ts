import { Position } from 'src/tag/dto/position.dto';

export class CreateIncidentDto {
  time: string;
  report: string;
  positions: Position[];
  rifles: { id: number }[];
}
