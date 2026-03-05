import { LoginFormValues, RegisterFormValues } from "@/types/AuthTypes";

export const authApiUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function login(payload: LoginFormValues): Promise<Response> {
  return fetch(`${authApiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export function register(payload: RegisterFormValues): Promise<Response> {
  return fetch (`${authApiUrl}/register`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(payload),
  })
}