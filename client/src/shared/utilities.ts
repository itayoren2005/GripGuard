import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { MapItem } from "./Types";
import { v4 } from "uuid";
import { MAP_HEIGHT, MAP_LENGTH } from "./Constants";

export const pickColor = () => {
  const colors = [
    "rgb(255, 141, 29)",
    "rgb(173, 216, 230)",
    "rgb(34, 139, 34)",
    "rgb(70, 130, 180)",
    "rgb(255, 165, 0)",
    "rgb(0, 128, 128)",
    "rgb(0, 0, 128)",
    "rgb(60, 179, 113)",
    "rgb(144, 238, 144)",
    "rgb(100, 149, 237)",
    "rgb(255, 99, 71)",
    "rgb(72, 61, 139)",
    "rgb(135, 206, 235)",
    "rgb(210, 105, 30)",
    "rgb(255, 215, 0)",
    "rgb(46, 139, 87)",
    "rgb(0, 100, 0)",
    "rgb(255, 228, 196)",
    "rgb(240, 128, 128)",
  ];

  const random_color = colors[Math.floor(Math.random() * colors.length)];
  return random_color;
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const notifyNoIncidents = () => {
  toast.error("No incidents on this day", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    style: { backgroundColor: "rgb(17, 48, 82)", color: "rgb(255, 141, 29)" },
  });
};
export const notifyCantLoadIncidents = () => {
  toast.error("Failed to load incident video.", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    style: { backgroundColor: "rgb(17, 48, 82)", color: "rgb(255, 141, 29)" },
  });
};

export const mapItems: MapItem[] = [
  {
    id: v4(),
    name: "wall",
    imageUrl: "/mapItems/wall.png",
    width: 50,
    height: 50,
  },
  {
    id: v4(),
    name: "tree",
    imageUrl: "/mapItems/tree.png",
    width: 50,
    height: 50,
  },
  {
    id: v4(),
    name: "river",
    imageUrl: "/mapItems/river.png",
    width: 50,
    height: 50,
  },
];
export const calcRefPoint1Diameter = (x: number, y: number) => {
  return (
    Math.sqrt(
      (MAP_LENGTH / 2 - x) * (MAP_LENGTH / 2 - x) +
        (MAP_HEIGHT / 2 - y) * (MAP_HEIGHT / 2 - y)
    ) * 2
  );
};
export const calcRefPoint2Diameter = (
  x: number,
  y: number,
  triangleLength: number,
  scale: number
) => {
  return (
    Math.sqrt(
      (MAP_LENGTH / 2 + triangleLength * scale - x) *
        (MAP_LENGTH / 2 + triangleLength * scale - x) +
        (MAP_HEIGHT / 2 - y) * (MAP_HEIGHT / 2 - y)
    ) * 2
  );
};
export const calcRefPoint3Diameter = (
  x: number,
  y: number,
  triangleLength: number,
  scale: number
) => {
  return (
    Math.sqrt(
      (MAP_LENGTH / 2 + (triangleLength * scale) / 2 - x) *
        (MAP_LENGTH / 2 + (triangleLength * scale) / 2 - x) +
        (MAP_HEIGHT / 2 + (Math.sqrt(3) / 2) * triangleLength * scale - y) *
          (MAP_HEIGHT / 2 + (Math.sqrt(3) / 2) * triangleLength * scale - y)
    ) * 2
  );
};
