import { Position } from "../shared/Types";
import { apiClient } from "../shared/utilities";

export const getIncidentVideo = async (
  incidentId: number
): Promise<Position[] | null> => {
  try {
    const response = await apiClient.get<Position[]>(
      `/incidents/positions/${incidentId}`
    );

    if (Array.isArray(response.data) && response.data.every(isValidPosition)) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching incident video:", error);
    return null;
  }
};

const isValidPosition = (obj: any): obj is Position => {
  return (
    obj &&
    typeof obj.tagId === "number" &&
    typeof obj.x === "number" &&
    typeof obj.y === "number" &&
    typeof obj.angle === "number"
  );
};
