import { DragEvent } from "react";
import { mapItems } from "../../shared/utilities";
import { MapItem } from "../../shared/Types";
import "./map.css";

const MapItems = () => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: MapItem) => {
    e.dataTransfer?.setData("text/plain", JSON.stringify(item));
  };

  return (
    <div className="map-items-container">
      {mapItems.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          className="map-item"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="map-item-image"
            width={item.width}
            height={item.height}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MapItems;
