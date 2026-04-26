import { useState } from "react";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

type Screen = "welcome" | "hello";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  if (screen === "hello") {
    return <HelloWorldScreen onNavigateHome={() => setScreen("welcome")} />;
  }
  return <WelcomeScreen onNavigateHello={() => setScreen("hello")} />;
}
