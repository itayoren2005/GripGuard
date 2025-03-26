import { FC, useEffect, useRef, useState } from "react";
import "./timeline.css";
import { Position } from "../../shared/Types";
import Sketch from "react-p5";
import {
  calcRefPoint1Diameter,
  calcRefPoint2Diameter,
  calcRefPoint3Diameter,
} from "../../shared/utilities";
import {
  DEFAULT_SCALE,
  DEFAULT_TRIANGLE_LENGTH,
  DEFAULT_RIFLES_COLORS,
  MAP_HEIGHT,
  MAP_LENGTH,
  TAG1_INDEX,
  TAG2_INDEX,
  STOPPING_DISTANCE,
  freezingDelay,
} from "../../shared/Constants";
import { SoliderPosition } from "../map/SoliderPosition";
import p5Types from "p5";
import RatioSlider from "../general/RatioSlider";

type VideoProps = {
  positions: Position[] | null;
};

const Video: FC<VideoProps> = ({ positions }) => {
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

  const [count, setCount] = useState<number>(0);
  const [isNotMoving, setIsNotMoving] = useState<boolean>(false);
  const riflesRefs = useRef<Record<number, SoliderPosition>>({});
  const [isAtTargets, setIsAtTargets] = useState<Record<number, boolean>>({
    1: false,
    2: false,
  });

  useEffect(() => {
    const isSoldiersAtTarget = Object.values(isAtTargets).every(
      (value) => value
    );

    if (isSoldiersAtTarget && positions && count < positions.length - 1) {
      setIsNotMoving(true);
      setTimeout(() => {
        setIsAtTargets({ 1: false, 2: false });
        setCount((prevCount) => prevCount + 1);
        setIsNotMoving(false);
      }, freezingDelay);
    }
  }, [isAtTargets, positions]);

  useEffect(() => {
    if (positions && positions[count]) {
      const currentPosition = positions[count];
      const updatedPosition = {
        tagId: currentPosition.tagId,
        x: currentPosition.x * DEFAULT_SCALE + MAP_LENGTH / 2,
        y: currentPosition.y * DEFAULT_SCALE + MAP_HEIGHT / 2,
        angle: currentPosition.angle - 90,
      };
      setLocations((prevLocations) => ({
        ...prevLocations,
        [currentPosition.tagId]: updatedPosition,
      }));
    }
  }, [count]);

  const setup = (p: p5Types, canvasParentRef: Element) => {
    p.createCanvas(MAP_LENGTH, MAP_HEIGHT).parent(canvasParentRef);
    p.angleMode(p.DEGREES);

    Object.keys(locations).forEach((id) => {
      const location = locations[Number(id)];
      riflesRefs.current[Number(id)] = new SoliderPosition(
        p,
        location.x,
        location.y
      );
    });
  };

  const draw = (p5Instance: p5Types) => {
    p5Instance.background(17, 48, 82);

    p5Instance.circle(MAP_LENGTH / 2, MAP_HEIGHT / 2, 15);
    p5Instance.circle(
      MAP_LENGTH / 2 + DEFAULT_TRIANGLE_LENGTH * DEFAULT_SCALE,
      MAP_HEIGHT / 2,
      15
    );
    p5Instance.circle(
      MAP_LENGTH / 2 + (DEFAULT_TRIANGLE_LENGTH * DEFAULT_SCALE) / 2,
      MAP_HEIGHT / 2 + (Math.sqrt(3) / 2) * DEFAULT_SCALE * 3,
      15
    );

    Object.entries(locations).forEach(([id, location]) => {
      const soliderRef = riflesRefs.current[Number(id)];
      if (soliderRef) {
        p5Instance.noFill();
        p5Instance.stroke(DEFAULT_RIFLES_COLORS[Number(id) - 1]);
        p5Instance.strokeWeight(0.3);

        p5Instance.circle(
          MAP_LENGTH / 2,
          MAP_HEIGHT / 2,
          calcRefPoint1Diameter(location.x, location.y)
        );
        p5Instance.circle(
          MAP_LENGTH / 2 + DEFAULT_TRIANGLE_LENGTH * DEFAULT_SCALE,
          MAP_HEIGHT / 2,
          calcRefPoint2Diameter(
            location.x,
            location.y,
            DEFAULT_TRIANGLE_LENGTH,
            DEFAULT_SCALE
          )
        );
        p5Instance.circle(
          MAP_LENGTH / 2 + (DEFAULT_TRIANGLE_LENGTH * DEFAULT_SCALE) / 2,
          MAP_HEIGHT / 2 +
            (Math.sqrt(3) / 2) * DEFAULT_TRIANGLE_LENGTH * DEFAULT_SCALE,
          calcRefPoint3Diameter(
            location.x,
            location.y,
            DEFAULT_TRIANGLE_LENGTH,
            DEFAULT_SCALE
          )
        );

        const target = p5Instance.createVector(location.x, location.y);
        p5Instance.fill(240, 248, 255);
        p5Instance.noStroke();

        if (!isNotMoving) {
          soliderRef.seek(target);
          soliderRef.update();
        }

        const distanceToTarget = p5Instance.dist(
          soliderRef.position.x,
          soliderRef.position.y,
          target.x,
          target.y
        );

        if (distanceToTarget <= STOPPING_DISTANCE && !isAtTargets[Number(id)]) {
          setIsAtTargets((prevIsAtTargets) => ({
            ...prevIsAtTargets,
            [Number(id)]: true,
          }));
        }

        soliderRef.show(location.angle, DEFAULT_RIFLES_COLORS[Number(id) - 1]);

        if (
          positions?.length &&
          count === positions?.length - 1 &&
          distanceToTarget <= STOPPING_DISTANCE
        ) {
          drawLine(p5Instance, locations[TAG1_INDEX], locations[TAG2_INDEX]);
        }
      }
    });
  };

  const drawLine = (p: p5Types, base: Position, vec: Position) => {
    p.push();
    p.stroke(255, 0, 0);
    p.strokeWeight(2);
    p.fill(255, 0, 0);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x - base.x, vec.y - base.y);
    p.pop();
  };

  return (
    <div className="video-container">
      {positions ? (
        <div>
          <Sketch setup={setup} draw={draw} />
          <div className="playbar">
            <RatioSlider
              scale={count}
              setScale={setCount}
              min={0}
              max={positions.length - 1}
              step={1}
            />
          </div>
        </div>
      ) : (
        <img src="/gripGuard.png" className="logo" />
      )}
    </div>
  );
};

export default Video;
