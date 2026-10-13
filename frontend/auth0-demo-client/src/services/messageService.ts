import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MessageResponse {
  message: string;
  userId?: string;
}

export const getPublicMessage = async (): Promise<MessageResponse> => {
  const response = await axios.get<MessageResponse>(
    `${API_BASE_URL}/api/messages/public`
  );

  return response.data;
};

export const getProtectedMessage = async (
  accessToken: string
): Promise<MessageResponse> => {
  const response = await axios.get<MessageResponse>(
    `${API_BASE_URL}/api/messages/protected`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};