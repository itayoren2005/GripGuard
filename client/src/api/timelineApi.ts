import { Incident, Rifle } from "../shared/Types";
import { apiClient } from "../shared/utilities";

export const getDayIncidents = async (date: string) => {
  try {
    const response = await apiClient.get<Incident[]>(`/incidents/date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return null;
  }
};

export const updateReportForIncident = async (id: number, report: string) => {
  try {
    const response = await apiClient.patch(`/incidents/update-report/${id}`, {
      report,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating incident report:", error);
    return null;
  }
};
export const getRifles = async (): Promise<Rifle[]> => {
  const rifles: Rifle[] = (await apiClient.get(`/rifle`)).data;
  return rifles;
};
