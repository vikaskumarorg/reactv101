import axios from "axios";
import type { User } from './usersTypes';

export const getUsersApi = async (): Promise<User> => {
  const response = await axios.get<User>("https://engagifii-support-crm.azurewebsites.net/api/v1/GetTenantInformation/maco",
    {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "tenant-code": "maco",
        },
      }
  );
  return response.data;
}