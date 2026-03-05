"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/types/AuthTypes";
import { register } from "@/services/authService";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/stores/useProfileStore";
import { defaultLoginRoutePath } from "@/lib/constants";

export function useRegister() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      direct_login: false,
    },
  });

  const [token, setToken] = useCookie("token");

  const router = useRouter();

  const { setProfile } = useProfileStore();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await register(data);

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Register failed");
      }

      if (!data.direct_login) {
        router.push(defaultLoginRoutePath);
      } else {
        // set cookie token
        setToken(json.token, {
          days: 7,
          SameSite: "Strict",
          Secure: true,
        });

        // set profile
        setProfile(json.data.user);

        // redirect to dashboard
        router.push("/dashboard");
      }

      // toast
      toast.success("Register successful");
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
