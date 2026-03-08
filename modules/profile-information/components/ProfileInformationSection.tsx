"use client";

import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/stores/useProfileStore";
import { Edit, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProfileInformationSection() {
  const { profile } = useProfileStore();
  return (
    <section className="container mx-auto py-3 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Profile Information</h3>
        <p className="text-xs text-muted-foreground">
          All the essential details about this customer in one place.
        </p>
      </div>
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
      <div>
        <h4 className="mb-1">Name</h4>
        <p className="text-xs text-muted-foreground">{profile?.name}</p>
      </div>
      <div>
        <h4 className="mb-1">Email</h4>
        <p className="text-xs text-muted-foreground">{profile?.email}</p>
      </div>
      <div className="flex gap-1">
        <Link href={"/dashboard/profile-information/edit-profile"}>
          <Button variant={"outline"}>
            <Edit className="size-3" />
            Edit Profile
          </Button>
        </Link>
        <Link href={"/dashboard/profile-information/change-password"}>
          <Button variant={"secondary"}>
            <Lock className="size-3" />
            Change Password
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default ProfileInformationSection;
