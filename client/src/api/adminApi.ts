import { Rifle, User } from "../shared/Types";
import { apiClient } from "../shared/utilities";
import { OK_STATUS } from "../shared/Constants";

export const getUsersInfo = async () => {
  try {
    const response = await apiClient.get<User[]>(`/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export const changeRole = async (user: User) => {
  try {
    const response = await apiClient.patch(
      `/user/update-role/${user.username}`,
      { role: user.role }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user's role:", error);
    return;
  }
};
export const addRifle = async (rifle: Rifle) => {
  try {
    const response = await apiClient.post(`/rifle`, {
      id: rifle.id,
      alias: rifle.alias,
      enable: rifle.enable,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding rifle:", error);
    return null;
  }
};

export const updateEnableRifle = async (id: number) => {
  try {
    const response = await apiClient.patch(`rifle/update-enable/${id}`);
    return response.status === OK_STATUS;
  } catch (error) {
    console.error("Error update enable:", error);
  }
};

export const deleteUser = async (username: string) => {
  try {
    await apiClient.delete(`/user/${username}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
