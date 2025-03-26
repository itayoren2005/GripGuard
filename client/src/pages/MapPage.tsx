import { FC, useContext, DragEvent, useState, useEffect } from "react";
import { RoleContext } from "../context/RoleContext";
import Block from "../components/general/Block";
import Map from "../components/map/Map";
import "../components/map/map.css";
import LogOut from "../components/general/LogOut";
import { Role } from "../shared/enums";
import RatioSlider from "../components/general/RatioSlider";
import { MapItem } from "../shared/Types";
import MapItems from "../components/map/MapItems";
import PickSoldierColor from "../components/map/PickSoliderColor";
import TriangleLength from "../components/map/TriangleLength";
import { setLength, sendReset } from "../api/mapApi";
import { Undo2 } from "lucide-react";

import {
  DEFAULT_SCALE,
  DEFAULT_TRIANGLE_LENGTH,
  DEFAULT_RIFLES_COLORS,
} from "../shared/Constants";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../components/general/OrangeButton";
import PageTour from "../Tours/PageTour";
import { AdminMapPageTourSteps, mapPageTourSteps } from "../Tours/Constants";

const MapPage: FC = () => {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [placedItems, setPlacedItems] = useState<MapItem[]>([]);
  const [colors, setColors] = useState<string[]>(DEFAULT_RIFLES_COLORS);
  const [triangleLength, setTriangleLength] = useState<number>(
    DEFAULT_TRIANGLE_LENGTH
  );
  const navigate = useNavigate();
  const roleContext = useContext(RoleContext);

  useEffect(() => {
    const sendLength = async () => {
      await setLength(triangleLength);
    };
    sendLength();
  }, [triangleLength]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedItem = JSON.parse(
      e.dataTransfer?.getData("text/plain") || "{}"
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newItem = {
      ...droppedItem,
      dropX: x,
      dropY: y,
    };

    setPlacedItems((prev) => [...prev, newItem]);
  };
  const backToAdmin = () => {
    navigate("/admin");
  };

  return roleContext?.role === Role.OBSERVER ||
    roleContext?.role === Role.ADMIN ? (
    <div className="map-page-wrapper">
      <div className="manage-map">
        <div className="top-content">
          <div className="ratio-slider-wrapper">
            <RatioSlider
              scale={scale}
              setScale={setScale}
              min={10}
              max={100}
              step={5}
            />
          </div>

          <div className="triangle-length-wrapper">
            <TriangleLength
              triangleLength={triangleLength}
              setTriangleLength={setTriangleLength}
            />
          </div>

          <div className="map-items-wrapper">
            <MapItems />
          </div>

          <div className="pick-soldier-color-wrapper">
            <PickSoldierColor colors={colors} setColors={setColors} />
          </div>
        </div>

        <div className="reset-button">
          <OrangeButton
            onClick={async () => {
              await sendReset();
              window.location.reload();
            }}
            text="Reset"
          />
        </div>
      </div>
      <div className="paper" onDragOver={handleDragOver} onDrop={handleDrop}>
        <Map
          scale={scale}
          placedItems={placedItems}
          setPlacedItems={setPlacedItems}
          soliderColors={colors}
          triangleLength={triangleLength}
        />
        <div className="side-menu">
          <div className="side-menu-content">
            {roleContext?.role === Role.OBSERVER ? (
              <LogOut />
            ) : (
              <IconButton
                onClick={backToAdmin}
                className="icon-bright-button"
                title="Back"
              >
                <Undo2 />
              </IconButton>
            )}
          </div>
          <div>
            <PageTour
              PageTourSteps={
                roleContext?.role === Role.OBSERVER
                  ? mapPageTourSteps
                  : AdminMapPageTourSteps
              }
              className={
                roleContext?.role === Role.OBSERVER
                  ? "tour-icon"
                  : "map-tour-icon "
              }
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Block />
  );
};

export default MapPage;
