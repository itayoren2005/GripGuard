import { FC, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import Block from "../components/general/Block";
import Map from "../components/map/Map";
import IncidentsCalendar from "../components/calender/Calender";
import "../components/admin/admin.css";
import IconMenu from "../components/admin/IconMenu";
import { Role } from "../shared/enums";
import {
  DEFAULT_SCALE,
  DEFAULT_TRIANGLE_LENGTH,
  DEFAULT_RIFLES_COLORS,
} from "../shared/Constants";
import { useNavigate } from "react-router-dom";
import PageTour from "../Tours/PageTour";
import { adminPageTourSteps } from "../Tours/Constants";

const AdminPage: FC = () => {
  const roleContext = useContext(RoleContext);
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate("/observer");
  };

  return roleContext?.role === Role.ADMIN ? (
    <div className="contents-panel-container">
      <div className="content-panel">
        <div className="panel" />
        <Map
          scale={DEFAULT_SCALE}
          soliderColors={DEFAULT_RIFLES_COLORS}
          triangleLength={DEFAULT_TRIANGLE_LENGTH}
          placedItems={[]}
          setPlacedItems={() => {}}
          onClick={handleMapClick}
          showTrash={false}
        />
      </div>
      <div className="content-panel">
        <div className="calender">
          <IncidentsCalendar />
          <div className="side-menu">
            <div className="side-menu-content">
              <IconMenu />
            </div>
            <div>
              <PageTour PageTourSteps={adminPageTourSteps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Block />
  );
};
export default AdminPage;
