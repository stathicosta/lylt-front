import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  isLoggedIn: boolean;
  username: string;
  email: string;
  logInUser: () => void;
  logOutUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      isLoggedIn: false,
      username: "",
      email: "",
      logInUser: () =>
        set((state) => ({
          ...state,
          isLoggedIn: !state.isLoggedIn,
          username: "JohnDoe",
          email: "johndoe@example.com",
        })),
      logOutUser: () => set({ isLoggedIn: false, username: "", email: "" }),
    }),
    {
      name: "lylt-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
