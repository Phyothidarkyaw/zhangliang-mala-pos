import {
  ChangePasswordFormValues,
  UserEditFormValues,
} from "@/types/UserTypes";
import { getCookie } from "react-use-cookie";

export const profileApiUrl =
  process.env.NEXT_PUBLIC_BASE_URL + "/dashboard/user-profile";

export function logout(): Promise<Response> {
  return fetch(`${profileApiUrl}/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
}

export function updateProfile(payload: UserEditFormValues): Promise<Response> {
  return fetch(`${profileApiUrl}/change-name`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify(payload),
  });
}

export function changePassword(
  payload: ChangePasswordFormValues,
): Promise<Response> {
  return fetch(`${profileApiUrl}/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify(payload),
  });
}
