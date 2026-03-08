"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { changePassword, logout } from "@/services/profileService";
import { useProfileStore } from "@/stores/useProfileStore";
import { ChangePasswordFormValues } from "@/types/UserTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import useCookie from "react-use-cookie";
import { toast } from "sonner";
import z from "zod";

export const changePasswordFormSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "Old password must be at least 8 characters"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    new_password_confirmation: z
      .string()
      .min(8, "New password confirmation must be at least 8 characters"),
    confirm_check: z.boolean().refine((val) => val === true, {
      message: "You must confirm to update password",
    }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New password and confirmation do not match",
    path: ["new_password_confirmation"],
  });

function ChangePasswordSection() {
  const router = useRouter();

  const { clearProfile } = useProfileStore();
  const [, , removeToken] = useCookie("token");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
      confirm_check: false,
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const res = await changePassword(data);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Password change failed");
      }
      await logout();
      clearProfile();
      removeToken();
      toast.success("Password changed successfully, Please login again");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <section className=" container mx-auto py-3  flex flex-col gap-4">
      <div className="">
        <h3 className=" text-xl font-semibold mb-1">Change Password</h3>
        <p className=" text-xs text-muted-foreground">
          Update password for enhanced account security.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-4">
          <Controller
            name="old_password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="current-password">
                  Current Password
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="current-password"
                  type="password"
                  placeholder=""
                  className="max-w-sm"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="new_password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-password">New Password</FieldLabel>

                <Input
                  {...field}
                  id="new-password"
                  type="password"
                  className="max-w-sm"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="new_password_confirmation"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-new-password">
                  Confirm New Password
                </FieldLabel>

                <Input
                  {...field}
                  id="confirm-new-password"
                  type="password"
                  className="max-w-sm"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="confirm_check"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="direct-login-check"
                  />
                  <FieldLabel htmlFor="direct-login-check">
                    I&#39;m sure to update.
                  </FieldLabel>
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className=" flex gap-1">
            <Button
              onClick={() => router.back()}
              type="button"
              variant={"outline"}
              size={"sm"}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit" size={"sm"}>
              {isSubmitting && <Spinner className=" size-3" />}
              Update Password
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
}

export default ChangePasswordSection;