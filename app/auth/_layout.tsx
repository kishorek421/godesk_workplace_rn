import { Stack } from "expo-router";

export const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
};
