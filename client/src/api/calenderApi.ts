import dayjs, { Dayjs } from "dayjs";
import { Incident } from "../shared/Types";
import { apiClient } from "../shared/utilities";

export const getMonthIncidents = async (date: Dayjs) => {
  const month = date.format("YYYY-MM");
  try {
    const response = await apiClient.get<Incident[]>(
      `/incidents/month/${month}`
    );

    const daysWithIncidents = response.data.map((incident) =>
      dayjs(incident.time).format("YYYY-MM-DD")
    );

    return daysWithIncidents;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return null;
  }
};
