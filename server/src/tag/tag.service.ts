import { Injectable, Scope } from '@nestjs/common';
import { Distances } from './dto/distances.dto';
import { Position } from './dto/position.dto';
import {
  TAG1_POSITION,
  TAG2_POSITION,
  CENTIMETERS_TO_METERS,
} from 'src/Constant';
import { Alerts } from './dto/alerts.dto';
import { CreateIncidentDto } from 'src/incident/dto/incident.dto';
import * as dayjs from 'dayjs';
import { IncidentService } from 'src/incident/incident.service';

@Injectable({ scope: Scope.DEFAULT })
export class TagService {
  private _tagsPositions: Position[] = [TAG1_POSITION, TAG2_POSITION];
  private _alertTags: Alerts = { alertTag1: false, alertTag2: false };
  private _triangleLength = 3;
  constructor(private _incidentService: IncidentService) {}

  get triangleLength(): number {
    return this._triangleLength;
  }

  set triangleLength(value: number) {
    if (value <= 0) throw new Error('Triangle length must be positive.');
    this._triangleLength = value;
    this.updatePoints();
  }

  pointA = { x: 0, y: 0 };
  pointB = { x: this._triangleLength, y: 0 };
  pointC = {
    x: this._triangleLength / 2,
    y: (Math.sqrt(3) / 2) * this._triangleLength,
  };

  private updatePoints() {
    this.pointB = { x: this._triangleLength, y: 0 };
    this.pointC = {
      x: this._triangleLength / 2,
      y: (Math.sqrt(3) / 2) * this._triangleLength,
    };
  }

  calcSolider = (distances: Distances): Position => {
    const xA = this.pointA.x;
    const yA = this.pointA.y;
    const xB = this.pointB.x;
    const yB = this.pointB.y;
    const xC = this.pointC.x;
    const yC = this.pointC.y;

    distances.distA = distances.distA / CENTIMETERS_TO_METERS;
    distances.distB = distances.distB / CENTIMETERS_TO_METERS;
    distances.distC = distances.distC / CENTIMETERS_TO_METERS;

    const a1 = 2 * (xB - xA);
    const b1 = 2 * (yB - yA);
    const d1 =
      distances.distA ** 2 -
      distances.distB ** 2 -
      xA ** 2 +
      xB ** 2 -
      yA ** 2 +
      yB ** 2;

    const a2 = 2 * (xC - xA);
    const b2 = 2 * (yC - yA);
    const d2 =
      distances.distA ** 2 -
      distances.distC ** 2 -
      xA ** 2 +
      xC ** 2 -
      yA ** 2 +
      yC ** 2;

    const determinant = a1 * b2 - a2 * b1;

    if (determinant === 0) {
      console.log("No unique solution exists for the soldier's position.");
      return;
    }

    const x = (d1 * b2 - d2 * b1) / determinant;
    const y = (a1 * d2 - a2 * d1) / determinant;

    return { tagId: distances.tagId, x, y, angle: distances.angle };
  };

  pushPositionToList = (position: Position): void => {
    this._tagsPositions.push(position);
  };

  findLastPosition = (tagId: number): Position => {
    for (const position of [...this._tagsPositions].reverse()) {
      if (position.tagId === tagId) {
        return position;
      }
    }
    return undefined;
  };

  toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  isAiming = (): boolean => {
    const solider1 = this.findLastPosition(1);
    const solider2 = this.findLastPosition(2);

    const checkAiming = (source: Position, target: Position): boolean => {
      const directionX = Math.cos(this.toRadians(source.angle - 90));
      const directionY = Math.sin(this.toRadians(source.angle - 90));

      const vectorToTargetX = target.x - source.x;
      const vectorToTargetY = target.y - source.y;

      const dotProduct =
        directionX * vectorToTargetX + directionY * vectorToTargetY;
      const magnitude1 = Math.sqrt(directionX ** 2 + directionY ** 2);
      const magnitude2 = Math.sqrt(vectorToTargetX ** 2 + vectorToTargetY ** 2);

      if (magnitude1 === 0 || magnitude2 === 0) {
        return false;
      }

      const cosineTheta = dotProduct / (magnitude1 * magnitude2);
      const angleBetween = Math.acos(cosineTheta);

      const baseDeviation = 10;
      const adjustedDeviation = baseDeviation / magnitude2;
      const deviationThreshold = this.toRadians(adjustedDeviation);

      return angleBetween <= deviationThreshold;
    };

    const soldier1Aiming = checkAiming(solider1, solider2);
    const soldier2Aiming = checkAiming(solider2, solider1);

    this._alertTags.alertTag1 = soldier1Aiming;
    this._alertTags.alertTag2 = soldier2Aiming;

    return soldier1Aiming || soldier2Aiming;
  };

  createIncident = (): void => {
    const incident: CreateIncidentDto = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      report: '',
      positions: this._tagsPositions.slice(-100),
      rifles: [{ id: 1 }, { id: 2 }],
    };
    this._incidentService.createIncident(incident);
    this.updateToLastTwoPosition();
  };

  updateToLastTwoPosition = (): void => {
    const tag1Position = this.findLastPosition(1);
    const tag2Position = this.findLastPosition(2);
    this._tagsPositions = [tag1Position, tag2Position];
  };

  resetIncidentArray = (): void => {
    this._tagsPositions = [TAG1_POSITION, TAG2_POSITION];
  };

  getAlerts = (): Alerts => {
    return this._alertTags;
  };

  updatePositionToTringleLength = (
    tag: Position,
    newTringleLength: number,
  ): Position => {
    const newPosition = {
      tagId: tag.tagId,
      x: (newTringleLength * tag.x) / this._triangleLength,
      y: (newTringleLength * tag.y) / this._triangleLength,
      angle: tag.angle,
    };
    this.pushPositionToList(newPosition);
    return newPosition;
  };

  alertTag = (id: number) => {
    switch (id) {
      case 1:
        return this._alertTags.alertTag1;
      case 2:
        return this._alertTags.alertTag2;
      default:
        return { message: `No alert found for tag ID: ${id}` };
    }
  };
}
