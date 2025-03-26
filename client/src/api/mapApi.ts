import { apiClient } from "../shared/utilities";

export const setLength = async (triangleLength: number) => {
  try {
    await apiClient.post(`/tag/length`, {
      triangleLength: triangleLength,
    });
  } catch (error) {
    console.error("Error setting length:", error);
  }
};

export const sendReset = async () => {
  try {
    await apiClient.post(`/tag/reset`);
  } catch (error) {
    console.error(error);
  }
};
