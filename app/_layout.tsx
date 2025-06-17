import { GlobalProvider, useGlobalContext } from "@/lib/global-provider";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RootLayoutNav() {
  const { isLogged, loading } = useGlobalContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "sign-in";
    const inRootGroup = segments[0] === "(root)";

    if (!isLogged && !inAuthGroup) {
      // Redirect to the sign-in page if not logged in
      router.replace("/sign-in");
    } else if (isLogged && inAuthGroup) {
      // Redirect to the home page if logged in and trying to access auth pages
      router.replace("/(root)/(tabs)");
    }
  }, [isLogged, loading, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GlobalProvider>
      <RootLayoutNav />
    </GlobalProvider>
  );
}
