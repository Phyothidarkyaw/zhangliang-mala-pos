"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { defaultLoginRoutePath } from "@/lib/constants";
import { logout } from "@/services/profileService";
import { useProfileStore } from "@/stores/useProfileStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import useCookie, { getCookie } from "react-use-cookie";
import { toast } from "sonner";

type Props = {};

function LogoutBtn({}: Props) {
  const { clearProfile } = useProfileStore();
  const [, , removeToken] = useCookie("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await logout();
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Login failed");
      }
      clearProfile();
      removeToken();
      router.push(defaultLoginRoutePath);
      toast.success(json.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} variant={"secondary"} onClick={handleClick}>
      {loading ? <Spinner className=" size-3" /> : <LogOut className="size-3" /> } Logout
    </Button>
  );
}

export default LogoutBtn;