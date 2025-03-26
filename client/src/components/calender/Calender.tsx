import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { getMonthIncidents } from "../../api/calenderApi";
import { useDateContext } from "../../context/DateContext";
import "./calender.css";
import { Row, Col } from "antd";
import { notifyNoIncidents, pickColor } from "../../shared/utilities";
import { getDayIncidents } from "../../api/timelineApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IncidentData = {
  date: string;
  count: number;
};

const IncidentsCalendar: FC = () => {
  const [incidentData, setIncidentData] = useState<IncidentData[]>([]);
  const navigate = useNavigate();
  const { date, setDate } = useDateContext();
  const [emptyDay, setEmptyDay] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    handleMonthChange(dayjs());
  }, []);

  useEffect(() => {
    if (emptyDay && !isInitialLoad) {
      notifyNoIncidents();
    }
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [date, emptyDay, isInitialLoad]);

  const handleDateClick = (date: Dayjs) => {
    const selectedDate = date.format("YYYY-MM-DD");
    setDate(selectedDate);

    if (selectedDate) {
      getDayIncidents(selectedDate).then((incidents) => {
        if (incidents?.length === 0) {
          setEmptyDay(true);
        } else {
          setEmptyDay(false);
          navigate("/timeline");
        }
      });
    }
  };

  const handleMonthChange = async (newMonth: Dayjs) => {
    const incidents = await getMonthIncidents(newMonth);
    if (incidents) {
      const incidentCounts = incidents.reduce(
        (countsAccumulator: IncidentData[], date: string) => {
          const existingEntry = countsAccumulator.find(
            (incident) => incident.date === date
          );
          if (existingEntry) {
            existingEntry.count += 1;
          } else {
            countsAccumulator.push({ date, count: 1 });
          }
          return countsAccumulator;
        },
        []
      );
      setIncidentData(incidentCounts);
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    const dayData = incidentData.find((item) => item.date === dateString);
    const count = dayData ? dayData.count : 0;

    return (
      <ul className="incidents">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <div
              className="incident-indicator"
              style={{ backgroundColor: pickColor() }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div className="calendar-container">
      <div className="blue-background">
        <Row gutter={[16, 16]} className="full-height">
          <Col className="calendar-col">
            <div className="calendar-wrapper">
              <Calendar
                cellRender={cellRender}
                onSelect={(date, { source }) => {
                  if (source === "date") {
                    handleDateClick(date);
                  }
                }}
                onPanelChange={(date) => handleMonthChange(date)}
                fullscreen={true}
                mode="month"
              />
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IncidentsCalendar;
