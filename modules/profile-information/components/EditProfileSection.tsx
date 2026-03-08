"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SelectSeparator } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { updateProfile } from "@/services/profileService";
import { useProfileStore } from "@/stores/useProfileStore";
import { UserEditFormValues } from "@/types/UserTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const profileEditFormSchema = z.object({
  name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

function EditProfileSection() {
  const { profile, setProfile } = useProfileStore();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<UserEditFormValues>({
    resolver: zodResolver(profileEditFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const onSubmit = async (data: UserEditFormValues) => {
    try {
      const res = await updateProfile(data);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Profile update failed");
      }
      setProfile(json.data);
      toast.success("Profile update successfully");
      router.back();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const router = useRouter();
  return (
    <section className="container mx-auto py-3 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Edit Profile Information</h3>
        <p className="text-xs text-muted-foreground">
          Update your information to keep records up to date.{" "}
        </p>
      </div>
      <div className="relative size-20">
        <Image
          width={80}
          height={80}
          className="size-20"
          src={
            profile?.profile_image ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          alt="profile image"
        />
        <Button className="size-5 absolute bottom-0 right-0 translate-1/2 duration-150 active:scale-90">
          <Edit className="size-3" />
        </Button>
      </div>
      <form id="user-edit" action="" onSubmit={handleSubmit(onSubmit)}></form>
      <div>
        <h4 className="mb-1">Name</h4>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                className="max-w-sm"
                {...field}
                aria-invalid={fieldState.invalid}
                id="name"
                type="text"
                autoComplete="name"
                placeholder={profile?.name}
                form="user-edit"
              />
            </Field>
          )}
        />
      </div>
      <div>
        <h4 className="mb-1">Email</h4>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                className="max-w-sm"
                {...field}
                aria-invalid={fieldState.invalid}
                id="email"
                type="email"
                autoComplete="email"
                placeholder={profile?.email}
                form="user-edit"
              />
            </Field>
          )}
        />{" "}
      </div>
      <div className="flex gap-1">
        <Button
          onClick={() => router.back()}
          type="button"
          variant={"secondary"}
          size={"sm"}
        >
          Cancel
        </Button>

        <Button
          disabled={isSubmitting}
          type="submit"
          form="user-edit"
          size={"sm"}
        >
          {isSubmitting && <Spinner className=" size-3" />}
          Update Name
        </Button>
      </div>

      <SelectSeparator className={"max-w-lg"}/>

      <div>
        <h3 className="text-lg font-semibold mb-2">Delete Account?</h3>
        <div className="flex gap-2 mb-4">
          <Checkbox className="size-3 " />
          <p className="text-xs text-muted-foreground">
            I confirm my account deactivation
          </p>
        </div>

        <Button
          onClick={() => router.back()}
          type="button"
          variant={"destructive"}
          size={"lg"}
        >
          Delete
        </Button>
      </div>
    </section>
  );
}

export default EditProfileSection;
