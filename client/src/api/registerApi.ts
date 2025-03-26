import { apiClient } from "../shared/utilities";

export const signUp = async (
  userUsername: string,
  userPassword: string,
  role: string
) => {
  const response = await apiClient.post(`/user/signup`, {
    username: userUsername,
    password: userPassword,
    role: role,
  });
  return response.data;
};

export const logIn = async (userUsername: string, userPassword: string) => {
  const response = await apiClient.post(`/user/login`, {
    username: userUsername,
    password: userPassword,
  });
  return response.data;
};
export const getToken = () => {
  return sessionStorage.getItem("token");
};
export const setupAxiosInterceptors = () => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
