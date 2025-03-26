import { useEffect, useRef, useState, FC } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { io, Socket } from "socket.io-client";
import {
  MAP_HEIGHT,
  MAP_LENGTH,
  SCALE_TWO_PERCENTS,
  TAG1_COLOR_INDEX,
  TAG1_INDEX,
  TAG2_COLOR_INDEX,
  TAG2_INDEX,
  TRASH_SIZE,
  TRASH_X,
  TRASH_Y,
} from "../../shared/Constants";
import { Alerts, MapItem, Position } from "../../shared/Types";
import { SoliderPosition } from "./SoliderPosition";
import {
  calcRefPoint1Diameter,
  calcRefPoint2Diameter,
  calcRefPoint3Diameter,
} from "../../shared/utilities";

type MapProps = {
  scale: number;
  placedItems?: MapItem[];
  setPlacedItems: (placedItems: MapItem[]) => void;
  soliderColors: string[];
  triangleLength: number;
  onClick?: () => void;
  showTrash?: boolean;
};

const Map: FC<MapProps> = ({
  scale,
  placedItems = [],
  setPlacedItems,
  soliderColors,
  triangleLength,
  onClick,
  showTrash = true,
}) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [locations, setLocations] = useState<{ [key: number]: Position }>({
    1: {
      tagId: 1,
      x: MAP_LENGTH / 2 + 100,
      y: MAP_HEIGHT / 2 + 100,
      angle: 0,
    },
    2: {
      tagId: 2,
      x: MAP_LENGTH / 2 + 200,
      y: MAP_HEIGHT / 2 + 200,
      angle: 0,
    },
  });
  const [alerts, setAlerts] = useState<Alerts>({
    alertTag1: false,
    alertTag2: false,
  });

  const socketRef = useRef<Socket | null>(null);
  const riflesRefs = useRef<{ [key: number]: SoliderPosition }>({});
  const imagesRef = useRef<{ [key: string]: p5Types.Image }>({});
  const trashCanImage = useRef<p5Types.Image | null>(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SERVER_URL}`, {
      reconnectionAttempts: 1,
      transports: ["websocket"],
    });

    socketRef.current = newSocket;

    newSocket.on("update-position", (newLocation: Position) => {
      setLocations((prevLocations) => {
        const updatedLocations = { ...prevLocations };
        updatedLocations[newLocation.tagId] = {
          tagId: newLocation.tagId,
          x: newLocation.x * scale + MAP_LENGTH / 2,
          y: newLocation.y * scale + MAP_HEIGHT / 2,
          angle: newLocation.angle - 90,
        };
        return updatedLocations;
      });
    });

    newSocket.on("update-alerts", (newAlerts: Alerts) => {
      setAlerts(newAlerts);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const loadImages = (p5Instance: p5Types) => {
    placedItems.forEach((item) => {
      if (item.imageUrl && !imagesRef.current[item.id]) {
        imagesRef.current[item.id] = p5Instance.loadImage(item.imageUrl);
      }
    });

    if (!trashCanImage.current && showTrash) {
      trashCanImage.current = p5Instance.loadImage("/mapItems/trash.png");
    }
  };

  const setup = (p: p5Types, canvasParentRef: Element) => {
    p.createCanvas(MAP_LENGTH, MAP_HEIGHT).parent(canvasParentRef);
    p.angleMode(p.DEGREES);
    Object.entries(locations).forEach(([id, location]) => {
      riflesRefs.current[Number(id)] = new SoliderPosition(
        p,
        location.x,
        location.y
      );
    });
  };

  const draw = (p5Instance: p5Types) => {
    loadImages(p5Instance);
    p5Instance.background(17, 48, 82);

    if (trashCanImage.current) {
      p5Instance.image(
        trashCanImage.current,
        TRASH_X,
        TRASH_Y,
        TRASH_SIZE,
        TRASH_SIZE
      );
    }

    placedItems.forEach((item) => {
      const img = imagesRef.current[item.id];
      if (item.dropX && item.dropY) {
        if (img) {
          p5Instance.image(
            img,
            item.dropX,
            item.dropY,
            item.width * scale * SCALE_TWO_PERCENTS,
            item.height * scale * SCALE_TWO_PERCENTS
          );
        }
      }
    });
    p5Instance.circle(MAP_LENGTH / 2, MAP_HEIGHT / 2, 15);
    p5Instance.circle(
      MAP_LENGTH / 2 + triangleLength * scale,
      MAP_HEIGHT / 2,
      15
    );
    p5Instance.circle(
      MAP_LENGTH / 2 + (triangleLength * scale) / 2,
      MAP_HEIGHT / 2 + (Math.sqrt(3) / 2) * triangleLength * scale,
      15
    );

    Object.entries(locations).forEach(([id, location]) => {
      const soliderRef = riflesRefs.current[Number(id)];
      if (soliderRef) {
        p5Instance.noFill();
        p5Instance.stroke(soliderColors[Number(id) - 1]);
        p5Instance.strokeWeight(0.3);

        p5Instance.circle(
          MAP_LENGTH / 2,
          MAP_HEIGHT / 2,
          calcRefPoint1Diameter(location.x, location.y)
        );
        p5Instance.circle(
          MAP_LENGTH / 2 + triangleLength * scale,
          MAP_HEIGHT / 2,
          calcRefPoint2Diameter(location.x, location.y, triangleLength, scale)
        );
        p5Instance.circle(
          MAP_LENGTH / 2 + (triangleLength * scale) / 2,
          MAP_HEIGHT / 2 + (Math.sqrt(3) / 2) * triangleLength * scale,
          calcRefPoint3Diameter(location.x, location.y, triangleLength, scale)
        );
        const target = p5Instance.createVector(location.x, location.y);
        p5Instance.fill(240, 248, 255);
        p5Instance.noStroke();

        soliderRef.seek(target);
        soliderRef.update();

        const color = soliderColors[Number(id) - 1];
        soliderRef.show(location.angle, color);
      }
    });

    alerts.alertTag1 &&
      drawArrow(
        p5Instance,
        locations[TAG1_INDEX],
        locations[TAG2_INDEX],
        soliderColors[TAG1_COLOR_INDEX]
      );
    alerts.alertTag2 &&
      drawArrow(
        p5Instance,
        locations[TAG2_INDEX],
        locations[TAG1_INDEX],
        soliderColors[TAG2_COLOR_INDEX]
      );
  };

  function drawArrow(p: p5Types, base: Position, vec: Position, color: string) {
    p.push();

    p.stroke(color);
    p.strokeWeight(2);
    p.fill(color);
    p.translate(base.x, base.y);

    p.line(0, 0, vec.x - base.x, vec.y - base.y);

    let arrowSize = 10;
    let angle = p.atan2(vec.y - base.y, vec.x - base.x);
    p.translate(vec.x - base.x, vec.y - base.y);
    p.rotate(angle);
    p.triangle(0, 0, -arrowSize * 2, arrowSize, -arrowSize * 2, -arrowSize);
    p.pop();
  }

  const mouseDragged = (p: p5Types) => {
    const mouseX = p.mouseX;
    const mouseY = p.mouseY;

    const itemIndex = placedItems.findIndex((item) => {
      if (!item.dropX || !item.dropY) return false;
      return (
        mouseX >= item.dropX &&
        mouseX <= item.dropX + item.width * scale &&
        mouseY >= item.dropY &&
        mouseY <= item.dropY + item.height * scale
      );
    });

    if (itemIndex !== -1) {
      const updatedItems = [...placedItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        dropX: mouseX - updatedItems[itemIndex].width / 2,
        dropY: mouseY - updatedItems[itemIndex].height / 2,
      };

      setPlacedItems(updatedItems);
      setDraggedItemIndex(itemIndex);
    }
  };

  const mouseReleased = () => {
    if (draggedItemIndex !== null) {
      const draggedItem = placedItems[draggedItemIndex];
      if (draggedItem.dropX && draggedItem.dropY)
        if (
          draggedItem.dropX >= TRASH_X - 20 &&
          draggedItem.dropX <= TRASH_X + TRASH_SIZE + 20 &&
          draggedItem.dropY >= TRASH_Y - 20 &&
          draggedItem.dropY <= TRASH_Y + TRASH_SIZE + 20
        ) {
          const updatedItems = placedItems.filter(
            (_, index) => index !== draggedItemIndex
          );
          setPlacedItems(updatedItems);
        }
    }

    setDraggedItemIndex(null);
  };

  return (
    <div onClick={onClick}>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
    </div>
  );
};

export default Map;
