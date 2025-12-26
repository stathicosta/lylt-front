import { createClient } from "@supabase/supabase-js";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (value.length > 2048) {
      console.warn(
        "Value being stored in SecureStore is larger than 2048 bytes and it may not be stored successfully. In a future SDK version, this call may throw an error.",
      );
    }
    return setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return deleteItemAsync(key);
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export const getUserQrCode = async (userId: string) => {
  // TODO: Discuss if a scenario where the userId does not exist
  // needs to be covered and how possible thie might be.
  console.debug("---Fetching QR code for user ID---", userId, "---");
  const { data, error } = await supabase
    .from("profiles")
    .select("qrcode")
    .eq("id", userId)
    .single();

  console.debug("---QR code data---", data, "---");

  if (error || !data) {
    throw error;
  }

  return data.qrcode;
};
