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
