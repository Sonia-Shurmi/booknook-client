
import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiOptions = RequestInit;

export const apiRequest = async (
  endpoint: string,
  options: ApiOptions = {}
) => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please log in to continue.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
};
