import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CustomUser {
  name: string;
  email?: string | null;
  phone?: string | null;
  id: string;
}

type UserStore = {
  qrCode?: string | null;
  user?: CustomUser | null;
  setUserDetails: (user: CustomUser) => void;
  logOutUser: () => void;
  setQrCode: (newQrCode: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      user: {} as CustomUser,
      qrCode: "",
      setUserDetails: (user: CustomUser) =>
        set(() => ({
          user,
        })),
      setQrCode: (newQrCode) =>
        set((state) => ({
          ...state,
          qrCode: newQrCode,
        })),
      logOutUser: () => set({ qrCode: "", user: null }),
    }),
    {
      name: "lylt-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
