import { FC, useContext, useEffect, useState } from "react";
import TimeLine from "../components/timeline/TimeLine";
import Video from "../components/timeline/Video";
import "../components/timeline/timeline.css";
import { RoleContext } from "../context/RoleContext";
import Block from "../components/general/Block";
import { Role } from "../shared/enums";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { getIncidentVideo } from "../api/videoApi";
import { Position } from "../shared/Types";
import { ToastContainer } from "react-toastify";
import { notifyCantLoadIncidents } from "../shared/utilities";
import PageTour from "../Tours/PageTour";
import { timeLinePageTourSteps } from "../Tours/Constants";
import { Undo2 } from "lucide-react";

const TimeLinePage: FC = () => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(
    null
  );
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [loading, setLoading] = useState(false);

  const roleContext = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPositions = async () => {
      if (selectedIncidentId !== null) {
        setLoading(true);
        try {
          const positions = await getIncidentVideo(selectedIncidentId);
          if (positions) {
            setPositions(positions);
          } else {
            throw new Error("Positions not found.");
          }
        } catch (err) {
          notifyCantLoadIncidents();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPositions();
  }, [selectedIncidentId]);

  const handleIncidentClick = (id: number) => {
    setSelectedIncidentId(id);
  };

  const backToCalendar = () => {
    if (roleContext?.role === Role.INVESTIGATOR) {
      navigate("/investigator");
    } else {
      navigate("/admin");
    }
  };

  if (
    !roleContext?.role ||
    (roleContext.role !== Role.INVESTIGATOR && roleContext.role !== Role.ADMIN)
  ) {
    return <Block />;
  }

  return (
    <div className="timeline-container">
      <div className="timeline-section">
        <TimeLine onIncidentClick={handleIncidentClick} />
      </div>
      <div className="video-section">
        {loading ? (
          <img src="/gripGuard.png" className="logo" alt="Loading..." />
        ) : (
          <Video positions={positions} />
        )}
      </div>
      <div className="back-button-section">
        <IconButton
          id="back-to-calendar"
          onClick={backToCalendar}
          className="icon-bright-button"
          title="Back"
        >
          <Undo2 />
        </IconButton>
        <PageTour PageTourSteps={timeLinePageTourSteps} />
      </div>

      <ToastContainer />
    </div>
  );
};

export default TimeLinePage;
