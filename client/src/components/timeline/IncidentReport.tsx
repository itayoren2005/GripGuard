import { FC, useState } from "react";
import { Grid2, IconButton, TextField } from "@mui/material";
import BlueButton from "../general/BlueButton";
import { updateReportForIncident } from "../../api/timelineApi";
import EditIcon from "@mui/icons-material/Edit";

export type IncidentReportProps = {
  id: number;
  report: string;
  onUpdateReport: (id: number, newReport: string) => void;
};

const IncidentReport: FC<IncidentReportProps> = ({
  id,
  report,
  onUpdateReport,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [reportText, setReportText] = useState<string>(report);

  const editReport = () => setIsEditing(!isEditing);

  const handleUpdateClick = async () => {
    await updateReportForIncident(id, reportText);
    onUpdateReport(id, reportText);
    setIsEditing(false);
    setReportText(reportText);
  };

  return (
    <Grid2 className="report">
      {isEditing ? (
        <Grid2>
          <TextField
            id="standard-multiline-flexible"
            label="Write your report"
            multiline
            maxRows={8}
            variant="standard"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="alciblue-textfield"
            onKeyDown={(e) => e.key === "Enter" && handleUpdateClick()}
          />
          <BlueButton text="Update" onClick={handleUpdateClick} />
        </Grid2>
      ) : (
        <h5 className="incident-report">{reportText}</h5>
      )}
      <IconButton
        onClick={editReport}
        className="icon-bright-button"
        title="Edit"
      >
        <EditIcon />
      </IconButton>
    </Grid2>
  );
};

export default IncidentReport;
