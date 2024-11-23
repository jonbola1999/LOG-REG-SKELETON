import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { UserType, RegType, AuthType } from "../type/UserType";

class AuthApi {
  static async reg(
    formData: RegType
  ): Promise<{ user: UserType; accessToken: string } | null> {
    try {
      const { data } = await axiosInstance.post<{
        user: UserType;
        accessToken: string;
      }>("/auth/reg", formData);
      return data;
    } catch (error) {
      return null;
    }
  }

  static async log(
    authData: AuthType
  ): Promise<{ user: UserType; accessToken: string } | null> {
    try {
      const { data } = await axiosInstance.post<{
        user: UserType;
        accessToken: string;
      }>("/auth/log", authData);
      return data;
    } catch (error) {
      return null;
    }
  }

  static async refresh(): Promise<{
    user: UserType;
    accessToken: string;
  } | null> {
    try {
      const { data } = await axiosInstance.get<{
        user: UserType;
        accessToken: string;
      }>("/auth/refresh");
      return data;
    } catch (error) {
      return null;
    }
  }

  static async logout(): Promise<void> {
    try {
      await axiosInstance.delete("/auth/logout");
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthApi;
