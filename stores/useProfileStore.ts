import { User } from "@/types/UserTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProfileState = {
  profile: User | null;
  setProfile: (user: User) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (user) => set({ profile: user }),

      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-storage",
    }
  )
);