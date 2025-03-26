import { Slider } from "@mui/material";
import { FC } from "react";

type RatioSliderProps = {
  scale: number;
  setScale: (scale: number) => void;
  min: number;
  max: number;
  step: number;
};
const RatioSlider: FC<RatioSliderProps> = ({
  scale,
  setScale,
  min,
  max,
  step,
}) => {
  return (
    <Slider
      value={scale}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="on"
      onChange={(_, newValue) => setScale(newValue as number)}
    />
  );
};

export default RatioSlider;
