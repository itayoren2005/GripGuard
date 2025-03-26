import * as path from 'node:path';
import { Position } from './tag/dto/position.dto';
export const ROOT_DIR = path.join(__dirname, '..');
export const TAG1_POSITION: Position = { tagId: 1, x: 1, y: 1, angle: 90 };
export const TAG2_POSITION: Position = { tagId: 2, x: 2, y: 2, angle: 90 };
export const CENTIMETERS_TO_METERS = 1000;
