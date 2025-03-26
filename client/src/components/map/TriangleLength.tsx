import { TextField } from "@mui/material";
import { FC, ChangeEvent } from "react";
import "./map.css";

type TriangleLengthProps = {
  triangleLength: number;
  setTriangleLength: (value: number) => void;
};

const TriangleLength: FC<TriangleLengthProps> = ({
  triangleLength,
  setTriangleLength,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setTriangleLength(value);
  };

  return (
    <TextField
      label="Triangle length"
      type="number"
      variant="outlined"
      value={triangleLength}
      onChange={handleChange}
      className="triangle-textfield"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          min: 0,
          step: 0.1,
        },
      }}
    />
  );
};

export default TriangleLength;
