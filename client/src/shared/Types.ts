import { Role } from "./enums";

export type Incident = {
  id: number;
  time: string;
  report: string;
};
export type User = {
  username: string;
  role: Role;
};
export type Rifle = {
  id: number;
  alias: string;
  enable: boolean;
};
export type Position = {
  tagId: number;
  x: number;
  y: number;
  angle: number;
};
export type Alerts = {
  alertTag1: boolean;
  alertTag2: boolean;
};
export interface MapItem {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  dropX?: number;
  dropY?: number;
}
