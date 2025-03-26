import { FC, useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineContent from "@mui/lab/TimelineContent";
import { useDateContext } from "../../context/DateContext";
import { getDayIncidents } from "../../api/timelineApi";
import { Incident } from "../../shared/Types";
import "./timeline.css";
import IncidentReport from "./IncidentReport";

type TimeLineProps = {
  onIncidentClick: (id: number) => void;
};

const TimeLine: FC<TimeLineProps> = ({ onIncidentClick }) => {
  const { date } = useDateContext();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [pickedIncident, setPickedIncident] = useState<number | null>(null);

  const eventClicked = (index: number) => {
    setPickedIncident(index);
    onIncidentClick(incidents[index].id);
  };

  useEffect(() => {
    if (date) {
      getDayIncidents(date).then((incident) => {
        if (incident) {
          setIncidents(incident);
        }
      });
    }
  }, [date]);

  const handleReportUpdate = (id: number, newReport: string) => {
    const updatedIncidents = incidents.map((incident) =>
      incident.id === id ? { ...incident, report: newReport } : incident
    );
    setIncidents(updatedIncidents);
  };

  return (
    <Timeline className="custom-timeline">
      {incidents.map((incident, index) => {
        const timeString = incident.time
          ? new Date(incident.time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
          : "Unknown time";

        return (
          <TimelineItem key={incident.id}>
            <TimelineOppositeContent
              className="custom-timeline-opposite"
              onClick={() => eventClicked(index)}
            >
              {timeString}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                className={index === pickedIncident ? "selected-dot" : "dot"}
                onClick={() => eventClicked(index)}
              />
              {index < incidents.length - 1 && (
                <TimelineConnector
                  className={index === pickedIncident ? "long-connector" : ""}
                />
              )}
            </TimelineSeparator>

            <TimelineContent>
              {index === pickedIncident && (
                <IncidentReport
                  report={incident.report}
                  id={incident.id}
                  onUpdateReport={handleReportUpdate}
                />
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default TimeLine;
