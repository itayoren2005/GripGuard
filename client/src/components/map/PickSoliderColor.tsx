import { FC, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Rifle } from "../../shared/Types";
import { getRifles } from "../../api/timelineApi";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

type PickSoliderColorProps = {
  colors: string[];
  setColors: (colors: string[]) => void;
};

const PickSoldierColor: FC<PickSoliderColorProps> = ({ colors, setColors }) => {
  const [rifle, setRifles] = useState<Rifle[]>([]);
  const [openPickColor, setOpenPickColor] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const soliders = await getRifles();
      setRifles(soliders);
    })();
  }, []);

  const handleOpenChange = (id: number) => {
    setOpenPickColor((prevIndex) => (prevIndex === id ? null : id));
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  return (
    <div>
      {rifle.map((soldier, index) => (
        <Accordion
          key={soldier.id}
          expanded={openPickColor === index}
          onChange={() => handleOpenChange(index)}
          className="solider-accordion"
        >
          <AccordionSummary>
            <Typography>{soldier.alias}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HexColorPicker
              color={colors[index]}
              onChange={(color) => handleColorChange(index, color)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
export default PickSoldierColor;
