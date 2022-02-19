import React from "react";
import AppText from "../components/layout/AppText";
import { AppScreen } from "../components/layout/Native-components";

const ConnectionLossScreen = () => {
  return (
    <AppScreen style={{ alignItems: "center", justifyContent: "center" }}>
      <AppText>No Connection {":("}</AppText>
    </AppScreen>
  );
};

export default ConnectionLossScreen;
