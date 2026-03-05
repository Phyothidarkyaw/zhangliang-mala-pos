"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/types/AuthTypes";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/useProfileStore";
import { login } from "@/services/authService";

export function useLogin() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [token, setToken] = useCookie("token");

  const router = useRouter();

  const { setProfile } = useProfileStore();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Login failed");
      }

      // set cookie token
      setToken(json.token, {
        days: data.remember ? 30 : 7,
        SameSite: "Strict",
        Secure: true,
      });

      // set profile
      setProfile(json.data.user);

      // redirect to dashboard
      router.push("/dashboard");

      // toast
      toast.success("Login successful");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return {
    ...form,
    onSubmit,
  };
}
