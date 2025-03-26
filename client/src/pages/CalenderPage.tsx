import { FC, useContext } from "react";
import IncidentsCalendar from "../components/calender/Calender";
import { RoleContext } from "../context/RoleContext";
import Block from "../components/general/Block";
import LogOut from "../components/general/LogOut";
import { Role } from "../shared/enums";
import PageTour from "../Tours/PageTour";
import { calendarPageTourSteps } from "../Tours/Constants";

const CalendarPage: FC = () => {
  const roleContext = useContext(RoleContext);

  return roleContext?.role === Role.INVESTIGATOR ? (
    <div className="clender-paper">
      <div className="calendar">
        <IncidentsCalendar />
      </div>
      <div className="side-menu">
        <div className="side-menu-content">
          <LogOut />
        </div>
        <div>
          <PageTour PageTourSteps={calendarPageTourSteps} />
        </div>
      </div>
    </div>
  ) : (
    <Block />
  );
};

export default CalendarPage;
