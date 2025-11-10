import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  isLoggedIn: boolean;
  username: string;
  email: string;
  toggleHadOnLogin: () => void;
};

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      isLoggedIn: false,
      username: "",
      email: "",
      toggleHadOnLogin: () =>
        set((state) => ({ ...state, isLoggedIn: !state.isLoggedIn })),
    }),
    {
      name: "lylt-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
