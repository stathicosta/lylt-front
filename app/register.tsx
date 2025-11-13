import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInputChangeEvent } from "react-native";
import Svg, { Path } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { theme } from "@/theme";

import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";

export default function LoginScreen() {
  const router = useRouter();
  const logInUser = useUserStore((state) => state.logInUser);

  const [username, setUsername] = useState("");
  const [usernameFormIsInvalid, setUsernameFormIsInvalid] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailFormIsInvalid, setEmailFormIsInvalid] = useState(false);
  const [passwordFormIsInvalid, setPasswordFormIsInvalid] = useState(false);

  const handleEmailInputChange = (e: TextInputChangeEvent) => {
    setEmail(e.nativeEvent.text);
  };

  const handleUsernameInputChange = (e: TextInputChangeEvent) => {
    setUsername(e.nativeEvent.text);
  };
  const handlePasswordInputChange = (e: TextInputChangeEvent) => {
    setPassword(e.nativeEvent.text);
  };
  // TODO: this has to be taken from the storage of the user
  // const { colorMode } = useContext(ThemeContext);
  const colorMode = "light"; // hardcoded for now

  const handleRegister = () => {
    if (username === "") {
      setUsernameErrorText("Username is required");
      setUsernameFormIsInvalid(true);
    } else {
      setUsernameErrorText("");
      setUsernameFormIsInvalid(false);
    }

    if (email === "") {
      setEmailErrorText("Email is required");
      setEmailFormIsInvalid(true);
    } else {
      setEmailErrorText("");
      setEmailFormIsInvalid(false);
    }

    if (password === "") {
      setPasswordErrorText("Password is required");
      setPasswordFormIsInvalid(true);
    } else {
      setPasswordErrorText("");
      setPasswordFormIsInvalid(false);
    }

    if (email === "" || password === "" || username === "") {
      return;
    }

    if (!isValidEmail(email)) {
      setEmailErrorText("Please enter a valid email address");
      setEmailFormIsInvalid(true);
      return;
    }

    logInUser();
    router.replace("/");
  };

  const handleLoginRedirect = () => {
    router.replace("/login");
  };

  const handleShowPassword = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <VStack space="md">
        <Box className="gap-6 mt-24 w-full lg:w-1/3">
          <VStack
            className={`${getBorderStyle(
              "Subtle",
              "",
            )} border-outline-100 border p-4 sm:p-5 gap-6 sm:gap-8 w-full`}
          >
            <VStack className="gap-1">
              <Heading size="2xl" className="text-typography-900">
                Register
              </Heading>
              <HStack className="gap-1.5">
                <Text className="font-normal text-lg text-typography-700">
                  Already have an account?
                </Text>
                <Text
                  onPress={handleLoginRedirect}
                  className="font-medium text-lg text-typography-700"
                >
                  Log In
                </Text>
              </HStack>
            </VStack>
            <VStack className="gap-5">
              <FormControl
                className="gap-1.5"
                isInvalid={usernameFormIsInvalid}
              >
                <FormControlLabel>
                  <FormControlLabelText className="text-m font-medium leading-normal text-typography-900">
                    Username
                  </FormControlLabelText>
                </FormControlLabel>
                <Input className={`py-0 ${getBorderStyle("Subtle", "input")}`}>
                  <InputField
                    onChange={handleUsernameInputChange}
                    aria-label="Username"
                    placeholder="Username"
                    className="text-m font-normal leading-[21px] text-typography-600 h-full"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {usernameErrorText}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl className="gap-1.5" isInvalid={emailFormIsInvalid}>
                <FormControlLabel>
                  <FormControlLabelText className="text-m font-medium leading-normal text-typography-900">
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Input className={`py-0 ${getBorderStyle("Subtle", "input")}`}>
                  <InputField
                    onChange={handleEmailInputChange}
                    aria-label="abc@gmail.com"
                    placeholder="abc@gmail.com"
                    className="text-m font-normal leading-[21px] text-typography-600 h-full"
                    type="text"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{emailErrorText}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                className="gap-1.5"
                size="md"
                isInvalid={passwordFormIsInvalid}
              >
                <FormControlLabel className="mb-1">
                  <FormControlLabelText className="text-typography-900 text-m">
                    Password
                  </FormControlLabelText>
                </FormControlLabel>
                <Input className={`${getBorderStyle("Subtle", "input")}`}>
                  <InputField
                    onChange={handlePasswordInputChange}
                    aria-label="password"
                    placeholder="Enter password"
                    className="text-m font-normal leading-[21px] text-typography-600 h-full"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputSlot className="pr-3" onPress={handleShowPassword}>
                    <InputIcon
                      as={showPassword ? EyeIcon : EyeOffIcon}
                      className="text-darkBlue-500 w-4 h-4"
                    />
                  </InputSlot>
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {passwordErrorText}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
            <Button
              onPress={handleRegister}
              className={`${getBorderStyle("Subtle", "button")} w-full`}
              size="sm"
              action="primary"
            >
              <ButtonText className="text-sm font-semibold leading-normal text-typography-0">
                Register
              </ButtonText>
            </Button>
            <HStack className="justify-center flex-1 items-center">
              <Divider className="h-0 flex-1 border-outline-100 border" />
              <Text className="text-typography-600 text-center text-xs font-normal leading-normal px-2">
                OR CONTINUE WITH
              </Text>
              <Divider className="h-0 flex-1  border-outline-100 border" />
            </HStack>
            <HStack className="gap-3 items-start self-stretch">
              <Button
                className={`${getBorderStyle("Subtle", "button")} flex-1`}
                variant="outline"
                action="secondary"
                aria-label="Google"
              >
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M15.6875 6.53112H15.0833V6.5H8.33334V9.5H12.572C11.9536 11.2464 10.292 12.5 8.33334 12.5C5.84822 12.5 3.83334 10.4851 3.83334 8C3.83334 5.51487 5.84822 3.5 8.33334 3.5C9.48047 3.5 10.5241 3.93275 11.3187 4.63962L13.4401 2.51825C12.1006 1.26987 10.3088 0.5 8.33334 0.5C4.19147 0.5 0.833344 3.85812 0.833344 8C0.833344 12.1419 4.19147 15.5 8.33334 15.5C12.4752 15.5 15.8333 12.1419 15.8333 8C15.8333 7.49712 15.7816 7.00625 15.6875 6.53112Z"
                    fill={colorMode === "light" ? "black" : "white"}
                  />
                  <Path
                    d="M1.69809 4.50912L4.16221 6.31625C4.82896 4.6655 6.44372 3.5 8.33334 3.5C9.48047 3.5 10.5241 3.93275 11.3187 4.63962L13.4401 2.51825C12.1006 1.26987 10.3088 0.5 8.33334 0.5C5.45259 0.5 2.95434 2.12637 1.69809 4.50912Z"
                    fill={colorMode === "light" ? "black" : "white"}
                  />
                  <Path
                    d="M8.33346 15.4993C10.2707 15.4993 12.031 14.7579 13.3618 13.5523L11.0406 11.588C10.2876 12.1584 9.35159 12.4993 8.33346 12.4993C6.38271 12.4993 4.72634 11.2554 4.10234 9.51953L1.65659 11.4039C2.89784 13.8328 5.41859 15.4993 8.33346 15.4993Z"
                    fill={colorMode === "light" ? "black" : "white"}
                  />
                  <Path
                    d="M15.6875 6.53113H15.0833V6.5H8.33334V9.5H12.572C12.275 10.3389 11.7353 11.0622 11.0393 11.5891L11.0405 11.5884L13.3617 13.5526C13.1975 13.7019 15.8333 11.75 15.8333 8C15.8333 7.49713 15.7816 7.00625 15.6875 6.53113Z"
                    fill={colorMode === "light" ? "black" : "white"}
                  />
                </Svg>
              </Button>
              <Button
                className={`${getBorderStyle("Subtle", "button")} flex-1`}
                variant="outline"
                action="secondary"
                aria-label="Twitter"
              >
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <Path
                    d="M5.66064 16.3131C12.4531 16.3131 16.1683 10.6856 16.1683 5.80539C16.1683 5.64555 16.1683 5.48643 16.1575 5.32803C16.8803 4.80525 17.5042 4.15794 18 3.41643C17.326 3.71523 16.611 3.9111 15.8789 3.99747C16.6499 3.53599 17.2269 2.81006 17.5025 1.95483C16.7776 2.38504 15.9845 2.6882 15.1574 2.85123C14.6006 2.25916 13.8642 1.86711 13.0621 1.73574C12.2601 1.60438 11.4371 1.74102 10.7205 2.12452C10.0039 2.50802 9.43367 3.11701 9.09806 3.85724C8.76245 4.59747 8.68016 5.42768 8.86392 6.21939C7.39567 6.14574 5.95932 5.76416 4.64809 5.09943C3.33686 4.4347 2.18007 3.50168 1.2528 2.36091C0.780546 3.17391 0.635904 4.13633 0.848325 5.05223C1.06075 5.96812 1.61426 6.76863 2.39616 7.29075C1.80842 7.27353 1.23349 7.11498 0.72 6.82851V6.87531C0.720233 7.72795 1.01539 8.55426 1.5554 9.21409C2.09542 9.87391 2.84705 10.3266 3.6828 10.4955C3.13911 10.6438 2.56866 10.6654 2.01528 10.5588C2.25136 11.2926 2.71082 11.9342 3.32943 12.394C3.94804 12.8539 4.69487 13.1089 5.46552 13.1235C4.69983 13.7253 3.82299 14.1703 2.88516 14.433C1.94733 14.6956 0.966911 14.7708 0 14.6542C1.68887 15.738 3.65394 16.3128 5.66064 16.3102"
                    fill={colorMode === "light" ? "black" : "white"}
                  />
                </Svg>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});

const getBorderStyle = (activeButton: string, elementType: string) => {
  switch (activeButton) {
    case "Sharp":
      return "rounded-none";
    case "Subtle":
      return "rounded-lg";
    case "Rounded":
      return elementType === "button" || elementType === "input"
        ? "rounded-full"
        : "rounded-2xl";
    default:
      return ""; // Default to subtle if no match
  }
};

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}
